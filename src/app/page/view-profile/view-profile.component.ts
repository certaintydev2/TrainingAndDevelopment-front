import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private userService:UserService) { }

  loggedInUserId: any = localStorage.getItem('id');
  userData:any;
  roles:any;
  coursesList:any;
  log_name:any;
  log_email:any;
  log_useName:any;
  log_password:any;
  log_profile:any;
  log_roles:any[]=[];

  ngOnInit(): void {
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res)=>{
        this.userData=res;
        this.log_name=this.userData.name;
        this.log_email=this.userData.email;
        this.log_useName=this.userData.userName;
        this.log_password=this.userData.password;
        this.log_profile=this.userData.profile;
        
        for (let i = 0; i < this.userData.roles.length; i++) {
            this.log_roles.push(this.userData.roles[i].roleName);
        }
      });
      this.userService.getAllRoles().subscribe(res => {
        this.roles = res;
      });
      this.userService.getCourses().subscribe(res => {
        this.coursesList = res;
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      });
  }

  updateProfile(data:any) {
    console.log(data);
    
  }
}
