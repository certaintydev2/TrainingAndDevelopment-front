import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar) { }

  coursesList:any;
  topicData:any;
  courseId:any;

  timeData:any=[
    {value: 'Week'},
    {value: 'Month'},
    {value: 'Days'},
  ];

  public topic: any = {
    topicName: '',
    course: {
      courseName:''
    },
    topicDescription:'',
    days:'',
    estimatedTime:'',
  };

  ngOnInit(): void {
    this.userService.getCourses().subscribe(
      (res) =>{
      console.log(res);
      this.coursesList = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });

  }


  AddTopic(data:any) {
    if (data != null) {
      console.log(data);
      
      this.userService.addTopic(data).subscribe(
        (res) => {
          if(res === null) {
            let snack = this.snackBar.open("Topic Already Added", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/home']);
          }else{
            this.topicData=res;
            this.courseId=this.topicData.course.courseId;
            let snack = this.snackBar.open("Topic Added Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/topicView/'+this.courseId]);
          }
        },(err:HttpErrorResponse)=>{
          if(err.status===401){
            this.userService.logout();
          }
        }
      );
    }
  }

}
