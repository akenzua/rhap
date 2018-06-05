import { BibleService } from './../bible.service';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  

  return: string = '';
  user;
  message;
  version;
  books;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userServive: UserService,
    private bibleService: BibleService
  ) { }


  ngOnInit(){
    
    this.route.queryParams
    .subscribe(params => this.return = params['return'] || '/');
    this.sharedService.currentMessage.subscribe(message => this.message = message)
  }

  onSignin(form: NgForm) {
    console.log(this.return)
    this.authService.signin(form.value.email, form.value.password)
      .subscribe(
        ( tokenData)=>{ 
          console.log(tokenData);
          this.userServive.getLanguange();
         
          
          this.router.navigateByUrl(this.return);
          console.log(this.return);
          this.getUser();
          // location.replace('/');
         
  },
      err =>{
        
        console.log(err)
      })
   
    // if(this.authService.signin(form.value.email, form.value.password)){
    //   this.router.navigateByUrl(this.return);
    //}
    this.router.navigateByUrl('/');
  }

  // newMessage() {
  //   this.sharedService.changeMessage('Bite')
    
  // }


getUser(){
  this.userServive.getUser()
  .subscribe((userData)=>{
    this.user = userData;
    
    this.sharedService.changeMessage(JSON.stringify(this.user));
  })
}


}
