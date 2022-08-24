import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService) { }

  userId:any;
  userData:any;
  coursesList: any;
  roles: any;
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
    this.userService.getAllRoles().subscribe((res) => {
      this.roles = res;
      console.log(res);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
    this.userService.getCourses().subscribe((res) => {
      console.log(res);
      this.coursesList = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
    this.userService.getUserById(this.userId).subscribe(
      (res)=>{
        console.log(res);
        this.userData=res;
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
    );
  }

}
