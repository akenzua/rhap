import { CacheService } from './../../../../cache.service';
import { BibleService } from './../../../../bible.service';

//import { User } from './../../../../user.interface';
import { UserService } from './../../../../user.service';
import { LANGUAGES } from './../../../../language';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Response } from "@angular/http";
import { Devotional } from '../../classes/devotional.interface';
import { DevotionalService } from '../../service/devotional.service';
//import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import {FormBuilder, FormGroup, FormControl, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatDatepickerModule} from '@angular/material';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';


// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Spinkit } from 'ng-http-loader/spinkits';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { ShareButtons } from '@ngx-share/core';




@Component({
  selector: 'app-devotional',
  templateUrl: './devotional.component.html',
  styleUrls: ['./devotional.component.css']
})

export class DevotionalComponent implements OnInit {


  devotionalForm: FormGroup;
  languageCtrl: FormControl;
  date:FormControl;
  filteredLanguages: any;
  language;
  selectedLanguge: string;
  currentDate;
  spinkit = Spinkit;


  languages;
 

  user  = "";
  
  metadata: Devotional[]=[];
  paragraphs;
  passages;
  opening;
  further;
  times =0;
  plan;
  newtestament;
  oldtestament;
  parameter;
  oldcode;
  newcode;
  text;
  last;
  defLang;
  defDate;
  langObj;
  pass0 = "";
  pass1 = "";
  pass2 = "";
  pass3 = "";
  pass4 = "";
  passkey0 = "";
  passkey1 = "";
  passkey2 = "";
  passkey3 = "";
  passkey4 = "";
  pass2error;
  socials = false;
  
  


  
  constructor( 
           
              //private userService: UserService,
              private bibleServices: BibleService,
              private devotionalService: DevotionalService,
              private formbuilder: FormBuilder,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
               private cacheService: CacheService,
               public share: ShareButtons
              
             ) { 
              this.languages = LANGUAGES;
              this.createFormControls();
              this.createForm();

              this.filteredLanguages = this.languageCtrl.valueChanges
              .startWith(null)
              .map(language => language && typeof language === 'object' ? language.name : language)
              .map(language => this.filterLanguages(language));
             
              // this.filteredLanguages = this.languageCtrl.valueChanges
              //   .pipe(
              //     startWith(''),
              //     map(language => language ? this.filterLanguages(language) : this.languages.slice())
              //   );
              // this.spinkit  = Spinkit;
              this.route.params.subscribe(params => {
                this.retrieveDevotional(params['language'],params['date'] );
                this.currentDate = params['date'];
                this.language = params['language'];
                // Save parameter to cookies
                this.cookieService.set('date', this.currentDate);
                this.cookieService.set('language', this.language);
               });
              
              }
             
  ngOnInit() {
    
    this.route.params.subscribe((params: any) => {
      this.defLang = params.language;
      this.defDate = params.date;
    
     });
     this.langObj = this.getObjects(this.languages,'id',this.defLang);
     console.log(this.langObj)

     this.devotionalForm.patchValue({
      languageCtrl: this.langObj[0],
      date :this.defDate
      }
    );
    //  defLang;
    //  defDate;
    // Check if cookies are set for parameters
 
    // Date
    if(this.cookieService.get('date')){
      this.currentDate = moment(this.cookieService.get('date')).format('YYYY-MM-DD');
     
    }else{
      
    this.currentDate = moment(new Date()).format('YYYY-MM-DD') ;
    }

    //Language
    if(this.cookieService.get('language')){
      this.language = this.cookieService.get('language')
    }else{
    this.language = 'English';
    }

    
  }
  toggleSocials(){
    if(this.socials === false){
      this.socials = true
    }else{
      this.socials = false;
    }
  }
  

retrieveDevotional(language, date){
 this.devotionalService.getMetadate(language, moment(date).format('YYYY-MM-DD') )
  .subscribe(
    (devotional:any) =>{
      this.metadata = devotional;
      this.opening = devotional.devotional.opening_verse;
      

      // Retrieve opening passage
      this.bibleServices.getOpening(this.opening)
        .subscribe(data => this.text = data);

       // Retrieve further passages 
       let further =  devotional.devotional.further.split(',');
       for (var _i = 0; _i < further.length; _i++) {
        //  let pass;
        this["pass"+_i] = further[_i];
        
        this.bibleServices.getFurther(this["pass"+_i])
          }
    // first passage
    if(this.pass0){
      this.bibleServices.getFurther(this.pass0)
        .subscribe(passages => this.passkey0  = passages);
    }
    //second passage
    if(this.pass1){
      this.bibleServices.getFurther(this.pass1)
        .subscribe(passages => this.passkey1  = passages);
    }
    //third passage
    if(this.pass2){
      this.bibleServices.getFurther(this.pass2)
        .subscribe(passages => this.passkey2  = passages);
    }
    //fourthpassage
    if(this.pass3){
      this.bibleServices.getFurther(this.pass3)
        .subscribe(passages => this.passkey3  = passages);
    }
    //fifth passage
    if(this.pass4){
      this.bibleServices.getFurther(this.pass4)
        .subscribe(passages => this.passkey4  = passages);
    }
    this.pass0 = null; 
    this.pass1 = null; 
    this.pass2 = null; 
    this.pass3 = null;  
    this.pass4 = null; 
    this.passkey0 = null;
    this.passkey1 = null;
    this.passkey2 = null;
    this.passkey3 = null;
    },
    err =>{
      this.last = "No article";
      
    }
  )
  

this.last ="";

   
}

//onRead Form Starts
// onRead(form: NgForm) {

//   this.router.navigate(['/devotional/', form.value.language, moment(form.value.currentDate).format('YYYY-MM-DD')]);
     
//   }
//onReadForm Ends
onRead(){
  if (this.devotionalForm.valid) {
    this.router.navigate(['/devotional/', this.devotionalForm.value.languageCtrl.id, moment(this.devotionalForm.value.date).format('YYYY-MM-DD')]);
  
  }
}
createFormControls() { 
  this.languageCtrl = new FormControl('', Validators.required);
  this.date = new FormControl('this.defDate', Validators.required);
}

createForm() { 
  this.devotionalForm = new FormGroup({
    
    languageCtrl: this.languageCtrl,
    date: this.date,
    
  });
}

filterLanguages(name: string) {
  return  name ? this.languages.filter(l =>
    l.name.toLowerCase().indexOf(name.toLowerCase()) === 0): this.languages;
}
displayFn(language): string {
  
    return language ? language.name : language;
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
selectedText: string = '';

  showSelectedText(oField) {
    event.preventDefault()
    const doc = document as any;
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        this.selectedText = text;
        console.log(text)
    } else if (doc.selection && doc.selection.type != "Control") {
        text = doc.selection.createRange().text;
        console.log(text)
    }
    this.selectedText = text;
    console.log(this.selectedText)
    
  }

 }



