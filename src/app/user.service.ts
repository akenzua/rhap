import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class UserService {

    language;
    user;
    errorMessage;
    baseUrl = 'admin.daysman.co';
    // baseUrl = 'localhost:8000';

  constructor(private http: Http, private authService: AuthService) { }

   getUser(): Observable<any>{
        const token = this.authService.getToken();
        return this.http.get(`http://` + this.baseUrl + `/api/profile?token=`+ token)
            .map(
                (response:Response)=> {
                    return response.json().user;
                }
            );
    }



    getLanguange(){
        this.getUser()
        .subscribe(
            language =>
            {
            //  this.language = language.language;
              localStorage.setItem('language', language.language)
              
             },
            error => this.errorMessage = error
          );
    }
    

}
