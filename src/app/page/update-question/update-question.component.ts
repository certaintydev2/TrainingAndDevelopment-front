import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar,private route:ActivatedRoute) { }

  subTopicsList:any;
  questionId:any;
  questionData:any;
  question:any;
  subTopicData:any;
  subTopicId:any;
  subTopicName:any;

  ngOnInit(): void {

    this.userService.getSubTopics().subscribe(
      (res) =>{
      this.subTopicsList = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
    this.questionId = this.route.snapshot.params['id'];
    
    this.userService.getQuestionsByQuestionId(this.questionId).subscribe((res)=>{
      console.log(res);
      
      this.questionData=res;
      this.question=this.questionData.question;
      this.subTopicData=this.questionData.subTopic;
      this.subTopicId=this.questionData.subTopic.id;
      this.subTopicName=this.questionData.subTopic.subTopicName;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

  updateQuestion(data:any) {
    this.userService.updateQuestion(this.questionId,data).subscribe((res)=>{
      let snack = this.snackBar.open("Question Updated Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/page/questionView/'+this.subTopicId]);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

  backButton() {
    this.router.navigate(['/page/questionView/'+this.subTopicId]);
  }

}
