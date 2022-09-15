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
  role:any;
  assignMentor:any;
  userList:any;
  mentorName:any;
  assignedMentorId:any;
  mentorUserData:any;
  assignedMentorData:any;
  check:Boolean=false;

  loggedInUserId: any = localStorage.getItem('id');

  ngOnInit(): void {
    this.getAllUsers();
    setTimeout(() => {
      this.getUserById(this.loggedInUserId);
    }, 500);
  }

  getUserById(id:any){
    this.userService.getUserById(id).subscribe(
      (res) => {
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.userRoleList = this.loggedInUserData.roles;
        if(this.userRoleList.length >1){
          this.role="AUTHOR, MENTOR"
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
              this.role="TRAINEE";
              this.check=true;
              this.userService.getassignMentorByTraineeId(id).subscribe(
                (res)=>{
                  this.assignMentor=res;
                  this.assignedMentorId=this.assignMentor.mentorId;
                  this.getUser(this.assignedMentorId);
                }
              );
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

  getUser(id:any){
    for (let i = 0; i < this.userList.length; i++) {
      if(this.userList[i].id === id) {
        this.assignedMentorData=this.userList[i];
        this.mentorName=this.userList[i].name;
      }
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (res)=>{
          this.userList=res;
      }
    );
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
