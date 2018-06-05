
import { CookieService } from 'ngx-cookie-service';
import { KeysPipe } from './verse.pipe';
import { BibleService } from './../../bible.service';
import { AuthGuardService } from './../../auth-guard.services';
import { UserService } from './../../user.service';
import { AuthService } from './../../auth.service';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DevotionalComponent } from './components/devotional/devotional.component';
import { DevotionalService } from './service/devotional.service';
import { DevotionalRoutingModule } from './devotional-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonpModule, Jsonp, Response } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { MaterialModule, MdDatepickerModule, MdNativeDateModule, MdAutocompleteModule, MdButtonModule, MD_DATE_FORMATS, DateAdapter } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatAutocompleteModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import 'hammerjs';
import { HttpClientModule } from '@angular/common/http'; 
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { CacheService } from './../../cache.service';
import { EscapeHtmlPipe } from './keep-html';
import { ShareModule } from '@ngx-share/core';
import { ShareButtonModule } from '@ngx-share/button';






@NgModule({
    imports: [
        CommonModule, 
        DevotionalRoutingModule, 
        NgbModule,  
        FormsModule, 
        ReactiveFormsModule, 
        JsonpModule,
        BrowserAnimationsModule,
      MatButtonModule, MatCheckboxModule,
      MatAutocompleteModule,
      MatDatepickerModule,
      MatInputModule, MatSelectModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatExpansionModule,
        FlexLayoutModule,
        MatCardModule,
        HttpClientModule,
        NgHttpLoaderModule,
        MatSidenavModule,
        MatButtonModule, MatCheckboxModule,
        MatDatepickerModule,
        ShareModule.forRoot(),
        MatListModule,
        MatIconModule,
        MatInputModule,
        ShareButtonModule.forRoot()
        
        
        
        ],
    declarations: [
        DevotionalComponent,
        KeysPipe,
        EscapeHtmlPipe
        ],
    providers: 
    [
        DevotionalService, 
        CacheService,
        AuthService, 
        UserService, 
        BibleService,
        CookieService,
        AuthGuardService,
        {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'}}

        ],
        schemas: [ NO_ERRORS_SCHEMA ]
})

export class DevotionalModule{}