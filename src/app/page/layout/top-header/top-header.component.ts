import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor(private router: Router , private userService:UserService) { }
  value = 'Search here...';
  userData:any;
  loggedInUserData:any;
  userRoleList:any;
  role:any

  loggedInUserId: any = localStorage.getItem('id');

  ngOnInit(): void {

    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        console.log('user', res);
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.userRoleList = this.loggedInUserData.roles;
        if(this.userRoleList.length >1){
          this.role="AUTHOR_MENTOR"
        }else{
          for (let i = 0; i < this.userRoleList.length; i++) {
            if (this.userRoleList[i].roleName==="ROLE_ADMIN") {
              this.role="ADMIN";
            }
            if (this.userRoleList[i].roleName==="ROLE_AUTHOR") {
              this.role="AUTHOR"
            }
            if (this.userRoleList[i].roleName==="ROLE_MENTOR") {
              this.role="MENTOR"
            }if (this.userRoleList[i].roleName==="ROLE_TRAINEE") {
              this.role="TRAINEE"
            }
          }
        }
      } ,(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.logout();
          }
      }
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
