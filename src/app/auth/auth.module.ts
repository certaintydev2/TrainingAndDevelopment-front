import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import { MatSlideToggleModule ,} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import {MatSelectModule} from '@angular/material/select';

import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    SendOtpComponent,
    VerifyOtpComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService ,
  ],
})
export class AuthModule { }
