import { CookieService } from 'ngx-cookie-service';
import { EscapeHtmlPipe } from './keep-html';

import { LanguagesPipe } from './language.pipe';
import { BibleService } from './../../bible.service';
import { UserService } from './../../user.service';
import { AuthService } from './../../auth.service';
import { NgModule } from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';

import { CommonModule } from '@angular/common';
import { BibleRoutingModule } from './bible-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonpModule, Jsonp, Response } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BibleComponent } from './components/bible/bible.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatAutocompleteModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import {MatListModule} from '@angular/material/list'; 






@NgModule({
    imports: [
        CommonModule, 
        BibleRoutingModule, 
        NgbModule,  
        FormsModule, 
        ReactiveFormsModule, 
        JsonpModule,
        MatListModule,
        FlexLayoutModule,
        FilterPipeModule,
        SuiModule,
        BrowserAnimationsModule,
        MatButtonModule, MatCheckboxModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatInputModule, MatSelectModule,
        MatFormFieldModule,
          FlexLayoutModule,
          HttpClientModule,
          NgHttpLoaderModule,
         
        ],
    declarations: [
        BibleComponent,
        LanguagesPipe,
        EscapeHtmlPipe
        ],
    providers: 
    [
        
        AuthService, 
        UserService, 
        BibleService,
        CookieService,
        {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'}}
        
        ]
})

export class BibleModule{}