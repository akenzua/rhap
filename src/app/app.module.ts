import { HttpClientModule } from '@angular/common/http';
import { BibleService } from './bible.service';
import { EscapeHtmlPipe } from './keep-html';
import { UserService } from './user.service';
import { HttpModule, JsonpModule, Jsonp, Response } from '@angular/http';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatAutocompleteModule, MatIconModule,
  MatFormFieldModule,MatSidenavModule, MatListModule,MatInputModule
  } from '@angular/material';
  import {SuiModule} from 'ng2-semantic-ui';
  

import 'hammerjs';

import { CookieService } from 'ngx-cookie-service';





import { DevotionalModule } from './modules/devotional/devotional.modules';
import { BibleModule } from './modules/bible/bible.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthService } from './auth.service';
// import { AsyncCacheModule } from './cache.service';
import {AuthGuardService} from './auth-guard.services'
import { UserComponent } from './user/user.component';
import { PlanComponent } from './modules/devotional/components/plan/plan.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { SharedService } from './shared.service';
import { CacheService } from './cache.service';
import { RoutingState } from './routing-state.service';
import { ShareModule } from '@ngx-share/core';
import { ShareButtonModule } from '@ngx-share/button';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    PageNotFoundComponent,
    UserComponent,
    PlanComponent,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    HttpModule,
    JsonpModule, 
    DevotionalModule,
    BibleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule, MatCheckboxModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    SuiModule,
    NgbModule.forRoot(),
    HttpClientModule, 
    ShareModule.forRoot(),
    ShareButtonModule.forRoot()
    
    
    
  ],
  providers: [AuthService, UserService, BibleService, CookieService, AuthGuardService, EscapeHtmlPipe, SharedService,  CacheService, RoutingState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
