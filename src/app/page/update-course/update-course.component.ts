import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private snackBar: MatSnackBar,private router: Router) { }
  courseId:any;
  course:any;
  courseName:any;
  authorName:any;
  mentorName:any;
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
  userProfileData:any[]=[];
  userProfile:any;
  errorMsg:any;

  msg:boolean = false;

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (res) =>{
      this.user = Object.values(res);
      for (let i = 0; i < this.user.length; i++) {
        this.userData[i] = {"name":this.user[i].split(',')[0],"user_id":this.user[i].split(',')[1],"role_name":this.user[i].split(',')[2]}       
      }
      for (let i = 0; i < this.userData.length; i++) {
        if(this.userData[i].role_name === "ROLE_AUTHOR") {
          
          this.userAuthorRole[this.j] = this.userData[i];
          this.j++;
        }

      }
      this.authorRole = this.userAuthorRole;
      console.log(this.authorRole);
      
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
    this.courseId = this.route.snapshot.params['id'];
    this.userService.getCourseByCourseId(this.courseId).subscribe(
      (res) => {
      this.course=res;
      console.log(this.course);
      
      this.courseName=this.course.courseName;
      this.authorName=this.course.authorId;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

  updateCourse(data:any) {
    console.log(data);
    this.userService.updateCourse(this.courseId,data).subscribe(
      (res) => {
      let snack = this.snackBar.open("Course Updated Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/viewCourse']);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
    
  }

  updatelist(data:any) {
    // debugger;
    let selectedCourseName = data;
    console.log(this.authorRole);
    for (let j = 0; j < this.userProfileData.length; j++) {
      for (let i = 0; i < this.authorRole.length; i++) {
        if(this.authorRole[i].user_id === this.userProfileData[j].user_id){
          
          if(this.userProfileData[j].profile_name.toUpperCase()=== selectedCourseName.toUpperCase()){
            this.userAuthorCourseRole[this.n] = this.userProfileData[j];
            this.n++;
          }
        }
      }
      
    }
    this.authorRole = this.userAuthorCourseRole;
    // this.mentorRole = this.userMentorCourseRole;
  }
  updateName(event:any) {
    console.log(event.target.value);
    this.updatelist(event.target.value);
  }

}
