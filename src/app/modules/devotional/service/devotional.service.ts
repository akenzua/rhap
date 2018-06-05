import { AuthService } from './../../../auth.service';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import "rxjs/Rx";
import { Observable } from "rxjs";
import { shareReplay, map } from 'rxjs/operators';

const CACHE_SIZE = 1;


@Injectable()
export class DevotionalService{
    
    baseUrl = 'admin.daysman.co';
    // baseUrl = 'localhost:8000';
    private cache$: Observable<any>;
    oldUrl;
    currentUrl;
    constructor(
        private http: Http, 
        private authService: AuthService,
        private httpClient: HttpClient
    ){

    }

    // get jokes() {
    //     if (!this.cache$) {
    //       this.cache$ = this.requestJokes().pipe(
    //         shareReplay(CACHE_SIZE)
    //       );
    //     }
    
    //     return this.cache$;
    //   }

    // getMetadate(language:any, date:any):  Observable<any> {
    //     const token = this.authService.getToken();
    //     return this.httpClient.get(`http://`   + this.baseUrl +  `/api/metadata/${language}/${date}?token=`+ token);
    // }

  

    getMetadate(language:any, date:any):  Observable<any> {

        this.currentUrl = `http://`   + this.baseUrl +  `/api/metadata/${language}/${date}?token=`;

        if(this.oldUrl  === this.currentUrl){
            console.log(this.oldUrl);
            this.currentUrl = null;
            return this.cache$;
        }else{
            
            const token = this.authService.getToken();
             this.cache$ = this.httpClient.get(this.currentUrl + token).pipe(
            shareReplay(CACHE_SIZE)
          );
        
            this.oldUrl = this.currentUrl;
            this.currentUrl = null;
            console.log(this.currentUrl);
            console.log(this.oldUrl);
            return this.cache$;
        }
        
        
    }
    

 

    getFurther(language:any, date:any){
       
        const token = this.authService.getToken();
        return this.http.get(`http://`  + this.baseUrl + `/api/paragraphs/${language}/${date}?token=`+ token)
            .map(
                (response:Response)=> {
                    return response.json().devotional.further;
                }
            );
    }

    getReadingPlan(language:any, date:any): Observable<any>{
       
        const token = this.authService.getToken();
        return this.http.get(`http://`  + this.baseUrl + `/api/bibleplan/${language}/${date}?token=`+ token)
            .map(
                (response:Response)=> {
                    return response.json();
                }
            );
    }
    
   
}