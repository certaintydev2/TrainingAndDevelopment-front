import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  errorMsg:any;

  msg:boolean = false;

  ngOnInit(): void {
    this.userService.getUser().subscribe(res =>{
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
    });
    this.courseId = this.route.snapshot.params['id'];
    this.userService.getCourseByCourseId(this.courseId).subscribe(res => {
      this.course=res;
      console.log(this.course);
      
      this.courseName=this.course.courseName;
      this.authorName=this.course.authorId;
      this.mentorName=this.course.mentorId;
    });
  }

  updateCourse(data:any) {
    console.log(data);
    this.userService.updateCourse(this.courseId,data).subscribe(res => {
      let snack = this.snackBar.open("Course Updated Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/viewCourse']);
    });
  }

  updatelist(data:any) {
    let selectedCourseName = data;
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
  updateName(event:any) {
    console.log(event.target.value);
    this.updatelist(event.target.value);
  }

}
