import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  check:Boolean=true;
  user: any;
  courseName:any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');

  ngOnInit(): void {
    // debugger;
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        console.log('user', res);
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.courseName = this.loggedInUserData.profile;
        this.userRoleList = this.loggedInUserData.roles;
        if(this.userRoleList.length >1){
          this.check = false;
        }
      } ,(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );
  }

  logout() {
    this.userService.logout();
  }

}
