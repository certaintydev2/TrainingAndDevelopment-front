import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'sendOtp',
    component: SendOtpComponent
  },
  {
    path: 'verifyOtp',
    component: VerifyOtpComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'addRole',
    component: AddRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
