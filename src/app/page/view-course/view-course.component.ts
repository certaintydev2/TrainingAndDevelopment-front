import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  user: any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');


  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    });
    this.userService.getUserById(this.loggedInUserId).subscribe(
      res => {
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.userRoleList = this.loggedInUserData.roles;
        for (let i = 0; i < this.userRoleList.length; i++) {
            if(this.userRoleList[i].roleName==="ROLE_ADMIN"){
              this.check = true;
          }
        }
      });
      this.getAllCourse();
  }

  getAllCourse() {
    this.userService.getCourses().subscribe(res => {
      console.log(res);
      this.courses = res;
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
          this.userService.deleteCourse(courseId).subscribe();
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
