import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService , private jwtHelper :JwtHelperService , private router: Router) { }

  token:any;
  tokenPayload:any;
  loggedInUser:any;
  loggedInUserData:any;
  userData:any;
  invalidUser:any;
  errorMsg:any;

  passwordMsg:boolean = false;
  userMsg:boolean = false;
  msg:boolean = false;
  public loginData: any = {
    userName: '',
    password: ''
  };
  roleList:any;
  roleData:any=[
    {roleName:"ROLE_ADMIN"},
    {roleName:"ROLE_AUTHOR"},
    {roleName:"ROLE_MENTOR"},
    {roleName:"ROLE_TRAINEE"},
  ];


  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(res=>{
      console.log(res);
      this.roleList=res;
      if(this.roleList.length===this.roleData.length){
        
      }else{
        for (let i = 0; i < this.roleData.length; i++) {
            this.userService.addRole(this.roleData[i]).subscribe(res=>{});
        }
      }
    });
  }

  loginformSubmit(data:any) {
    if (data.userName != ''  && data.password !='') {
      this.userService.loginUser(data).subscribe(
        (res) => {
          this.token=Object.values(res)[0];
          localStorage.setItem('token',this.token);
          this.GetTokenDecoded();
        },(err:HttpErrorResponse)=>{
          this.errorMsg = err.error.text;
          if(this.errorMsg === "User Invalid") {
            this.userMsg = true;
            this.router.navigate(['/auth']);
          }
         else if(this.errorMsg === "Password Invalid") {
            this.passwordMsg = true;
            this.router.navigate(['/auth']);
          }
          console.log(err.error.text);
        });
    }else{
      this.errorMsg = "User And Password Invalid"
      this.msg = true;
      this.router.navigate(['/auth']);
    }
  }

  GetTokenDecoded() {
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.loggedInUser = JSON.parse(this.tokenPayload);
    if (this.loggedInUser.sub != null) {
      this.userService.getUserByUserName(this.loggedInUser.sub).subscribe(
        (res) =>{
          console.log(res);
          this.userData = JSON.stringify(res);
          this.loggedInUserData = JSON.parse(this.userData);
          localStorage.setItem('id' , this.loggedInUserData.id);
          this.router.navigate(['/page/home']);
        },(err)=>{
            console.log(err);  
        });
    } else {
      this.errorMsg = "User Not Valid"
      this.msg = true;
      this.router.navigate(['/auth']);
    }
  }

}
