import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from './../auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { LANGUAGES} from './../language'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  languages;
  error;
  response;
  constructor(private authservice: AuthService) { }
 
  ngOnInit() {
    this.languages = LANGUAGES;
  }
    // this.userService.getUser()
      // .subscribe(
      //   language =>
      //   {
      //     this.language = language.language;
          
      //     this.getVs();
      //     console.log(this.bookNames)
        
         
          
          
          
      //   },
      //   error => this.errorMessage = error
      // );

  onSignup(form: NgForm){
    console.log(form.value.language.id)
    this.authservice.signup(form.value.username, form.value.email, form.value.password, form.value.language.id)
      .subscribe(
        response => {
          this.response = response
        
        },
        error => {
          this.error = error._body;
          console.log(error)
        }

      );
  }

  search = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .map(term => term === '' ? []
      : this.languages.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

formatter = (x: {name: string}) => x.name;
}
