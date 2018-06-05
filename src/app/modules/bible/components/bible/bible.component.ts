import { Form } from './../../classes/form';
import { UserService } from './../../../../user.service';
import { Version } from './../../../../versions';
import { VERSIONS } from './../../../../version-data';
import { Component, OnInit, NgModule } from '@angular/core';
import { BibleService } from './../../../../bible.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';








@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.css']
})
export class BibleComponent implements OnInit {
  
  selectedBook;
  selectedChapter;
  selectedVersion;
  selectedVersionName;
  selectedId;
  vs;
  versionSimple;
  versions: any;
  books;
  saveBooks;
  bookNames;
  errorMessage;
  chapters;
  content;
  language;
  userFilter;
  subId;
  id;
  ord;
  copyright;
  spinkit;
  show = "togContent";
  showChapter;
  versionSort;
  chosenBook;
  chosenChapter;
  abbr;
  chapterBook;
  url;
  previous;
  next;
  
  constructor(
    private bibleServices: BibleService,
    private userService : UserService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.spinkit  = Spinkit;
    // console.log(this.userService.getLanguange())
  }

 

// Onint Starts
  ngOnInit() {
    // console.log(this.userService.getLanguange())
    this.versionSimple = VERSIONS;
    if (this.route.snapshot.params['id']) {
      this.url = this.route.snapshot.params['id'];
      this.subId = this.url.split(':').pop();
      console.log(this.subId)
      this.abbr =  this.subId.substr(0, this.subId.indexOf('.')); 
      console.log(this.abbr)

      this.route.params.subscribe(params => {
      this.retrieveChapter(params['id']);
        
       }
     );
      
      this.selectedVersion= this.url.substr(0, this.url.indexOf(':')); 
      console.log(this.selectedVersion)
      if(localStorage.getItem('language')){
        this.language = localStorage.getItem('language');
      }else{
        this.language = 'eng';
      }
      this.getVs();
      
    
  }
console.log(this.selectedBook)

  }
// Onint Ends

booksAnchor(){
  if(this.show==" "|| this.show=="togChapters"|| this.show=="togContent"||this.show=="togVersions"){
     this.show = "togBooks";
  }else if(this.show = "togBooks"){
    this.show = "togContent";
   
  }
 
  
}
chaptersAnchor(){
  if(this.show==" " || this.show=="togBooks"|| this.show=="togContent"||this.show=="togVersions"){
     this.show = "togChapters";
  }else if(this.show = "togChapters"){
    this.show = "togContent";
    
  }
 
  
}

VersionsAnchor(){
  if(this.show==" " || this.show=="togBooks"|| this.show=="togContent"||this.show=="togChapters"){
    this.show = "togVersions";
 }else if(this.show = "togVersions"){
   this.show = "togContent";
   
 }
}


onSelectBook(id,book?:string){
  this.show = " ";
 console.log(id)
  let chap = id - 1;
  this.chapters = this.bookNames[chap];
  this.chosenBook = book;
  console.log(this.chosenBook)
  this.show = "togChapters";
  
}

onSelectChapter(id, chapter?:string){
   this.router.navigate(['/bible/'+ id]);
   this.url = id;
   
   this.show = "togContent";   
}

retrieveChapter(id){
  
  this.bibleServices.getChapterMini(id)
  .subscribe(
    chapterData =>
    {
      this.content = chapterData.response.chapters[0];
      this.selectedChapter = this.content.chapter;
      this.selectedBook = this.content.parent.book.name;
      if(this.content.previous){
        this.previous = this.content.previous.chapter.id;
      }else{
        this.previous = '';
      }

      if(this.content.next){
        this.next = this.content.next.chapter.id;
      }else{
        this.next ='';
      }
      
      
      console.log(this.next)
      console.log(this.previous)
      // console.log(this.content.previous.chapter.id)
      // this.content = chapterData.response.verses;
      // this.copyright =chapterData.response.verses[0].copyright;
    
    },
      error => this.errorMessage = error
    );
    //this.retrieveVersions();
  }

  retrieveTest(){
    this.retrieveChapter(this.next);
  }

retrieveBooks(id){
  this.bibleServices.getBooks(id)
    .subscribe(
      bookData => 
      { 
      
       this.books = bookData;
       this.bookNames =bookData.response.books;
       console.log(this.bookNames)
       this.ord = this.getObjects(this.bookNames,'abbr', this.abbr);
       this.ord = this.ord[0].ord;
       this.ord = this.ord - 1;
       console.log(this.ord)
      
            this.chapters = this.bookNames[this.ord];
        
      },
      error => this.errorMessage = error
  );

} 

onSelectVersion(id){
  this.selectedVersion = id;
  console.log(id)
  // this.url = this.route.snapshot.params['id'];
  this.subId = this.url.split(':').pop();
  let fullId = id+':'+this.subId;
  console.log(fullId)
  this.onSelectChapter(fullId);
  this.getVs();
  this.show = "togContent";

}

// retrieveVersions(){
//   this.bibleServices.getVersion(this.language)
//   .subscribe(
//     versionData=>
//     {
//    this.versions = versionData.response.versions;
//   if(this.selectedVersion){
//     this.selectedVersion=this.selectedVersion;
//   }else{
//    this.selectedVersion = this.versions[0].id;
//   }
//    this.retrieveBooks(this.selectedVersion);
//    //console.log(this.versions)
//    //this.versionSort = JSON.parse(this.versions);
//    this.selectedVersionName = this.getObjects(this.versions,'id',this.selectedVersion);
//    console.log(this.selectedVersionName)
//   this.selectedVersionName = this.selectedVersionName[0].abbreviation;
   
//     },
//     error => this.errorMessage = error
//   );
// }

getVs(){
  this.versions = this.getObjects(this.versionSimple,'lang', this.language)
  if(this.selectedVersion){
    this.selectedVersion=this.selectedVersion;
  }else{
   this.selectedVersion = this.versions[0].id;
  }
  this.retrieveBooks(this.selectedVersion);
  //console.log(this.versions)
  //this.versionSort = JSON.parse(this.versions);
  this.selectedVersionName = this.getObjects(this.versions,'id',this.selectedVersion);
  console.log(this.selectedVersionName)
 this.selectedVersionName = this.selectedVersionName[0].abbreviation;
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
