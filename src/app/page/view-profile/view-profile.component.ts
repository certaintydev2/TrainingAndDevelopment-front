import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private userService:UserService,private router: Router,private snackBar: MatSnackBar,private route:ActivatedRoute) { }

  loggedInUserId: any = localStorage.getItem('id');
  userData:any;
  roles:any;
  log_name:any;
  log_email:any;
  log_useName:any;
  log_password:any;
  log_profile:any;
  selectedProfile:any;
  userRole:any;

  coursesList:any=[
    {value: 'JAVA', courseName: 'JAVA'},
    {value: 'PYTHON', courseName: 'PYTHON'},
    {value: 'NODE JS', courseName: 'NODE JS'},
    {value: 'ANGULAR', courseName: 'ANGULAR'},
    {value: 'REACT JS', courseName: 'REACT JS'},
    {value: 'PHP', courseName: 'PHP'}
  ];

  ngOnInit(): void {
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res)=>{
        this.userData=res;
        this.log_name=this.userData.name;
        this.log_email=this.userData.email;
        this.log_useName=this.userData.userName;
        this.log_password=this.userData.password;
        this.log_profile=this.userData.profile.toUpperCase();
        this.userRole=this.userData.roles;
        setTimeout(() => {
          for (let i = 0; i < this.userRole.length; i++) {
            this.selectedProfile=this.userRole[i].roleName;
          }
        }, 2000);
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      });
      this.userService.getAllRoles().subscribe((res) => {
        this.roles = res;
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      });
  }
  changeRole(data:any) {
    console.log(data);
    
  }

  updateProfile(data:any) {
   this.userService.updateUser(this.loggedInUserId,data).subscribe(
    (res)=>{
      console.log(res);
      
      let snack = this.snackBar.open("Profile Updated Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/home']);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
   );
  }
}
