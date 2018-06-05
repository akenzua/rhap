import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found.component';



import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
    //{ path: 'profile', component: UserComponent}
   { path: '**', component: PageNotFoundComponent}
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}