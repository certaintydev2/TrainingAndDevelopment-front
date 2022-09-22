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

  userProfile:any;
  userProfileData:any[]=[]

  errorMsg:any;

  msg:boolean = false;

  public course: any = {
    courseName: '',
    authorId: '',
    courseDescription:''
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
        console.log(res);
        
      this.user = Object.values(res);
      for (let i = 0; i < this.user.length; i++) {
        this.userData[i] = {"name":this.user[i].split(',')[0],"user_id":this.user[i].split(',')[1],"role_name":this.user[i].split(',')[2]}       
      }
      console.log(this.userData);
      
      for (let i = 0; i < this.userData.length; i++) {
        if(this.userData[i].role_name === "ROLE_AUTHOR") {
          
          this.userAuthorRole[this.j] = this.userData[i];
          this.j++;
        }
      }
      this.authorRole = this.userAuthorRole;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
    this.userService.getUserProfile().subscribe(
      (res)=>{
        this.userProfile = Object.values(res);
      for (let i = 0; i < this.userProfile.length; i++) {
        this.userProfileData[i] = {"name":this.userProfile[i].split(',')[0],"user_id":this.userProfile[i].split(',')[1],"profile_name":this.userProfile[i].split(',')[2],"profile_id":this.userProfile[i].split(',')[3]}       
      }
      console.log(this.userProfileData);
      
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
    console.log(this.authorRole);
    for (let j = 0; j < this.userProfileData.length; j++) {
      for (let i = 0; i < this.authorRole.length; i++) {
        if(this.authorRole[i].user_id === this.userProfileData[j].user_id){
          if(this.userProfileData[j].profile_name.toUpperCase()=== selectedCourseName.toUpperCase()){
            console.log(this.userProfileData[j].name);
            this.userAuthorCourseRole[this.n] = this.userProfileData[j];
            this.n++;
          }
        }
      }
      
    }
    console.log(this.userAuthorCourseRole);
    
    
    this.authorRole = this.userAuthorCourseRole;
  }
}
