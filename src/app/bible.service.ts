import { Injectable } from '@angular/core';
import { Http, JsonpModule, Jsonp, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, shareReplay, map } from 'rxjs/operators';
import 'rxjs/Rx';



const CACHE_SIZE = 1;


@Injectable()
export class BibleService{

    baseUrl = 'admin.daysman.co';
    // baseUrl = 'localhost:8000';
    currentOpening;
    oldOpening;
    currentChapter;
    oldChapter;
    currentVersion;
    oldVersion;
    private cache$: Observable<any>;
    private cacheChapter$: Observable<any>;
    private cacheVersion$: Observable<any>;
   
    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private httpClient: HttpClient
    ){
        
    }

    private extractData(res:Response) {
    let body = res.json();
    return body;
  }

    getPassages(verse:string, times:number): Observable<any>{
        
        
        return this.jsonp.request(`http://getbible.net/json?passage=${verse}&callback=__ng_jsonp__.__req${times}.finished`, { method: 'Get' })
                      
            .map(
                (response:Response)=> {
                    return response.json();
                      
                }
                
            );
            
    }


    // getFurther(verse:string, times:number): Observable<any>{
        
        
    //     return this.jsonp.request(`http://getbible.net/json?passage=${verse}&callback=__ng_jsonp__.__req${times}.finished`, { method: 'Get' })
                      
    //         .map(
    //             (response:Response)=> {
    //                 return response.json();
                      
    //             }
                
    //         );
            
    // }


        getStudy(verse:string, times:number): Observable<any>{
        
        return this.jsonp.request(`http://getbible.net/json?passage=${verse}&callback=__ng_jsonp__.__req${times}.finished`, { method: 'Get' })
                      
            .map(
                (response:Response)=> {
                    return response.json();
                      
                }
                
            );
            
    }

    getVersion(lang):  Observable<any> {
        return this.httpClient.get(`http://`  + this.baseUrl + `/api/versions/${lang}`)
    }
   




    getBooks(version): Observable<any> {
        this.currentVersion = version;
        
            if(this.oldVersion  === this.currentVersion){
                console.log(this.oldVersion);
                this.currentVersion = null;
                return this.cacheVersion$;
            }else{
                
                
                 this.cacheVersion$ = this.httpClient.get(`http://`  + this.baseUrl + `/api/books/${version}`).pipe(
                shareReplay(1)
              );
            
                this.oldVersion = this.currentVersion;
                this.currentVersion = null;
                console.log(this.currentVersion);
                console.log(this.oldVersion);
                return this.cacheVersion$;
            }
        //  return this.httpClient.get(`http://`  + this.baseUrl + `/api/books/${version}`)
          
}

getChapter(chapter): Observable<any> {
         return this.httpClient.get(`http://`  + this.baseUrl +  `/api/chapter/${chapter}`)
            
}

getChapterMini(chapter): Observable<any> {
    this.currentChapter = chapter;
    
        if(this.oldChapter  === this.currentChapter){
            console.log(this.oldChapter);
            this.currentChapter = null;
            return this.cacheChapter$;
        }else{
            
            
             this.cacheChapter$ = this.httpClient.get(`http://`  + this.baseUrl +  `/api/details/${chapter}`).pipe(
            shareReplay(1)
          );
        
            this.oldChapter = this.currentChapter;
            this.currentChapter = null;
            console.log(this.currentChapter);
            console.log(this.oldChapter);
            return this.cacheChapter$;
        }
    // return this.httpClient.get(`http://`  + this.baseUrl +  `/api/details/${chapter}`)
      
}

getOpening(opening):  Observable<any> {
    this.currentOpening = opening;

    if(this.oldOpening  === this.currentOpening){
        console.log(this.oldOpening);
        this.currentOpening = null;
        return this.cache$;
    }else{
        
        
         this.cache$ = this.httpClient.get(`http://` + this.baseUrl + `/api/opening/${opening}`).pipe(
        shareReplay(CACHE_SIZE)
      );
    
        this.oldOpening = this.currentOpening;
        this.currentOpening = null;
        console.log(this.currentOpening);
        console.log(this.oldOpening);
        return this.cache$;
    }
    
    // return this.httpClient.get(`http://` + this.baseUrl + `/api/opening/${opening}`)
}
// http://localhost:8000/api/further/john+3:1-5&version=eng-KJVA  
getFurther(further):  Observable<any> {
    return this.httpClient.get(`http://` + this.baseUrl + `/api/opening/${further}`)
} 

}