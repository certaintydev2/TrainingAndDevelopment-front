import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService:UserService , private router:Router) { }


  public changePasswordData:any={
    email:'',
    newPassword:'',
  };

  email:any = localStorage.getItem('email');

  ngOnInit(): void {
  }

  changePassword(data:any) {
    if(data != null) {
      if(data.email === this.email) {
        this.userService.changePassword(data).subscribe(
          res=>{
          console.log(res);
          localStorage.clear();
          this.router.navigate(['']);
          
        },(err:HttpErrorResponse)=>{
          console.log(err);
          
        });
      }
    }
  }

}
