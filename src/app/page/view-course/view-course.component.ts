import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  constructor(private userService: UserService) { }

  courses: any;
  users: any;
  author_name: any;
  mentor_name: any;
  check:Boolean=false;
  checkUser:Boolean=true;
  user: any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');
  page:number=1;
  count:number=0;
  tableSize:number=2;
  tableSizes:any=[1,2,3,4,5];
  courseByProfile:any[]=[];
  courseData:any[]=[];
  otherRole:Boolean=false;
  userProfile:any[]=[];


  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.userProfile=this.loggedInUserData.profile;
        this.userRoleList = this.loggedInUserData.roles;
        if(this.userRoleList.length>1){
          this.checkUser=false;
        } else{
          for (let i = 0; i < this.userRoleList.length; i++) {
            if(this.userRoleList[i].roleName==="ROLE_ADMIN"){
              this.check = true;
            }
            if(this.userRoleList[i].roleName==="ROLE_MENTOR" || this.userRoleList[i].roleName==="ROLE_TRAINEE" || this.userRoleList[i].roleName==="ROLE_AUTHOR"){
              this.otherRole = true;
            }
        }
        }
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      });
      this.getAllCourse();
      setTimeout(() => {
        this.getCoursesByProfile(this.userProfile)
      }, 500);
  }

  getCoursesByProfile(data:any){
    for (let i = 0; i < data.length; i++) {
      this.userService.getCourseByCourseName(data[i].profileName).subscribe(
        (res)=>{
          this.courseData.push(res);
        }
      );
    }
   setTimeout(() => {
    for (let i = 0; i < this.courseData.length; i++) {
      if(this.courseData[i].courseId != null){
        this.courseByProfile.push(this.courseData[i]);
      }
    }
   }, 500);
  }


  onTableDataChange(event:any) {
    this.page=event;
    this.getAllCourse();
  }

  getAllCourse() {
    this.userService.getCourses().subscribe((res) => {
      this.courses = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }
  
  deleteCourse(courseId:any) {
    if(courseId != null) {
      Swal.fire({
        title: 'Do you want to delete Course?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed === true) {
          this.userService.deleteCourse(courseId).subscribe(
            (res)=>{

            },(err:HttpErrorResponse)=>{
                if(err.status===401){
                  this.userService.logout();
                }
            }
          );
          setTimeout(() => {
            this.getAllCourse();
          }, 1000);
        }
      })  
    }
  }

  getData(id: any) {
    console.log(id);
  }
}
