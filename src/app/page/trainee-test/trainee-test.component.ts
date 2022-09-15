import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trainee-test',
  templateUrl: './trainee-test.component.html',
  styleUrls: ['./trainee-test.component.css']
})
export class TraineeTestComponent implements OnInit {

  constructor(private userService:UserService) { }

  check:Boolean=true;
  user: any;
  profileList:any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');


  ngOnInit(): void {
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        console.log('user', res);
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.profileList = this.loggedInUserData.profile;
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

}
