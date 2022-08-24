import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

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
        localStorage.setItem('userName', this.user);
        if(this.userRoleList.length >1){
          this.check = false;
        }
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
      );

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
