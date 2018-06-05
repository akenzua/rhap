import { Version } from './versions';
import { VERSIONS } from './version-data';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, NavigationEnd} from '@angular/router'
import * as moment from 'moment';
import { SharedService } from './shared.service';
import * as $ from 'jquery';
import { PageEvent } from '@angular/material';
import { HostListener, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { BibleService } from './bible.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'app';
  language = 'eng';
  date;
  token = true;
  options: FormGroup;
  user;
  message;
  isScroll:boolean;
  isLogos:boolean;
 previousUrl;
 email;
 books;
 version;
 selectedVersion;
  

  
    constructor(
      fb: FormBuilder,
      private router: Router,
      private sharedService: SharedService,
      private bibleService: BibleService
      
    ) {
      this.options = fb.group({
        'fixed': true,
        'top': 0,
        'bottom': 0,
      });
      this.version = VERSIONS;
      this.devLink();
      this.getBibleLink();



    
      
      if (localStorage.getItem('token')){
        this.token = true;
      }else{
        this.token = false;
      }
     
      
    }
    ngOnInit(){
      
      this.router.events.filter(e => e instanceof NavigationEnd).pairwise().subscribe((e) => {
        this.previousUrl = e[0];
        console.log(this.previousUrl.url)
       
});

   
      
      if(localStorage.getItem('message') && localStorage.getItem('message') !=='default message'){
        this.getMessage();
      }else{
        this.setMessage();
        // this.getMessage();
        
        
      
    }

   
    
  



    }
    number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    @HostListener("window:scroll", ['$event'])
    onWindowScroll() {
  
      const check = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
    
    
      if(check <= 40){
        this.isScroll= false;
        this.isLogos= false;
        console.log(check);
      }else  if (this.number > check){
        this.isScroll= true;
        this.isLogos= true;
        console.log('scrolling up');
      }
      this.number = check;
      
    }

  // setup link for devotional
  devLink(){
    if(localStorage.getItem('language')){
      this.language = localStorage.getItem('language');
      this.books = localStorage.getItem('books'); 
      
    }else{
      this.language = 'eng'
    }
    this.date =  moment(new Date()).format('YYYY-MM-DD') ;

  }

  logOut(){
    if (localStorage.getItem('token')) {
      localStorage.clear();
      this.token = false;
      this.message='';
      this.router.navigateByUrl('/');
    }
  }
  getMessage(){
    this.message = JSON.parse(localStorage.getItem('message'));
  }
  setMessage(){
    this.sharedService.currentMessage.subscribe((message) => {
      this.message = message.email;
      localStorage.setItem('message', message);
      this.message = localStorage.getItem('message');
      if (this.previousUrl && this.previousUrl.url === '/signin'){
        location.replace('/');
      }
      
      
      
     
    })
   
    
  }
//   .subscribe(
//     bookData => 
//     { 
    
//      this.books = bookData;
//      this.bookNames =bookData.response.books;
//      console.log(this.bookNames)
//      this.ord = this.getObjects(this.bookNames,'abbr', this.abbr);
//      this.ord = this.ord[0].ord;
//      this.ord = this.ord - 1;
//      console.log(this.ord)
    
//           this.chapters = this.bookNames[this.ord];
      
//     },
//     error => this.errorMessage = error
// );
  
  getBibleLink(){
    this.version = this.getObjects(this.version,'lang', this.language)
  
    this.selectedVersion = this.version[0].id;
    console.log(this.selectedVersion);
    this.bibleService.getBooks(this.selectedVersion)
    .subscribe(
      books => {
        this.books = books.response.books[0].chapters[0].id;
        console.log(this.books);
      }
    )

 
  
}

getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
          objects = objects.concat(this.getObjects(obj[i], key, val));    
      } else 
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
          objects.push(obj);
      } else if (obj[i] == val && key == ''){
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1){
              objects.push(obj);
          }
      }
  }
  return objects;
}
  
}
