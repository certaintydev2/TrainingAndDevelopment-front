import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private userService:UserService ,  private router: Router,private snackBar: MatSnackBar) { }

  user:any;
  userData:any[]=[]
  userAuthorRole:any[]=[];
  authorRole:any;
  userMentorRole:any[]=[];
  mentorRole:any;
   j =0;
   k =0;

   userAuthorCourseRole:any[]=[];
  authorCourseRole:any;
  userMentorCourseRole:any[]=[];
  mentorCourseRole:any;
  m=0;
  n=0;

  errorMsg:any;

  msg:boolean = false;

  public course: any = {
    courseName: '',
    authorId: '',
    mentorId: '',
  };
  coursesList:any=[
    {value: 'JAVA', courseName: 'JAVA'},
    {value: 'PYTHON', courseName: 'PYTHON'},
    {value: 'NODE JS', courseName: 'NODE JS'},
    {value: 'ANGULAR', courseName: 'ANGULAR'},
    {value: 'REACT JS', courseName: 'REACT JS'},
    {value: 'PHP', courseName: 'PHP'}
  ];

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (res) =>{
      this.user = Object.values(res);
      for (let i = 0; i < this.user.length; i++) {
        this.userData[i] = {"name":this.user[i].split(',')[0],"user_id":this.user[i].split(',')[1],"role_name":this.user[i].split(',')[2],"profile":this.user[i].split(',')[3]}       
      }
      for (let i = 0; i < this.userData.length; i++) {
        if(this.userData[i].role_name === "ROLE_AUTHOR") {
          
          this.userAuthorRole[this.j] = this.userData[i];
          this.j++;
        }
        if(this.userData[i].role_name === "ROLE_MENTOR") {
          
          this.userMentorRole[this.k] = this.userData[i];
          this.k++;
        }

      }
      this.authorRole = this.userAuthorRole;
      this.mentorRole = this.userMentorRole;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  AddCourse(data:any) {
    if (data != null) {
      this.userService.addCourse(data).subscribe(
        (res) => {
          if(res === null) {
            let snack = this.snackBar.open("Course Already Added", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/home']);
          }else{
            let snack = this.snackBar.open("Course Added Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
            this.router.navigate(['/page/viewCourse']);
          }
        },(err:HttpErrorResponse) =>{
          this.errorMsg = err.error.text;
          if(err.status===401){
            this.userService.logout();
          }
          if(this.errorMsg === "Course Already Added") {
            this.msg = true;
            this.router.navigate(['/page/course']);
            }
        }
      );
    }

  }
  updatelist() {
    let selectedCourseName = this.course.courseName;
    for (let i = 0; i < this.authorRole.length; i++) {
      if((this.authorRole[i].profile).toLowerCase() === (selectedCourseName).toLowerCase()) {
        this.userAuthorCourseRole[this.m] = this.authorRole[i];
        this.m++;
      }
    }
    for (let i = 0; i < this.mentorRole.length; i++) {
      if((this.mentorRole[i].profile).toLowerCase() === (selectedCourseName).toLowerCase()) {
        this.userMentorCourseRole[this.n] = this.mentorRole[i];
        this.n++;
      }
    }
    this.authorRole = this.userAuthorCourseRole;
    this.mentorRole = this.userMentorCourseRole;
  }
}
