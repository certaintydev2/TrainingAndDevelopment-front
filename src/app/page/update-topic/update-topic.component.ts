import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.css']
})
export class UpdateTopicComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar,private route:ActivatedRoute) { }

  coursesList:any;
  topicData:any;
  topicId:any;
  courseData:any;
  courseId:any;

  topicName:any;
  courseName:any;


  ngOnInit(): void {
    this.userService.getCourses().subscribe((res) =>{
      this.coursesList = res;
    });
    this.topicId = this.route.snapshot.params['id'];
    this.userService.getTopicByTopicId(this.topicId).subscribe(res=>{
      console.log(res);
      this.topicData=res;
      this.topicName=this.topicData.topicName;
      this.courseData=this.topicData.course;
      this.courseId=this.topicData.course.courseId;
      this.courseName=this.topicData.course.courseName;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

  updateTopic(data:any) {
    this.userService.updateTopic(this.topicId,data).subscribe((res)=>{
      let snack = this.snackBar.open("Topic Updated Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/topicView/'+this.courseId]);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

  backButton() {
    this.router.navigate(['/page/topicView/'+this.courseId]);
  }

}
