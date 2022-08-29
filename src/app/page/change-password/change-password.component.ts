import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService:UserService,private router: Router,private snackBar: MatSnackBar) { }

  loggedInUserId: any = localStorage.getItem('id');

  public changePasswordData:any={
    oldPassword:'',
    newPassword:''
  };
  public checkPasswordData:any={
    oldPassword:''
  }

  ngOnInit(): void {
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res)=>{
        console.log(res);
        }, (err: HttpErrorResponse) => {
        if(err.status===401){
          this.userService.logout();
        }
      }
    );
  }
  changePassword(data:any){
    this.userService.changePassword(this.loggedInUserId,data).subscribe(
      (res)=>{
        console.log(res);
        let snack = this.snackBar.open("User Added Successfully", "Done");
        snack.afterDismissed().subscribe(() => {
        });
        snack.onAction().subscribe(() => {
        });
        this.router.navigate(['/page/home']);
      }, (err: HttpErrorResponse) => {
        console.log(err);
        
        if(err.status===401){
          this.userService.logout();
        }
      }
    );
  }
}
