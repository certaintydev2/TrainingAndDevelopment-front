import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar) { }

  subTopicsList:any;
  questionData:any;
  subTopicId:any;

  public question: any = {
    question: '',
    subTopic: {
      subTopicName:''
    },
  };

  ngOnInit(): void {
    this.userService.getSubTopics().subscribe(res=>{
      console.log(res);
      this.subTopicsList = res;
    });
  }

  AddQuestion(data:any) {
    if(data != null) {
      this.userService.addQuestion(data).subscribe(res=>{
        if(res === null) {
          let snack = this.snackBar.open("Question Already Added", "Done");
          snack.afterDismissed().subscribe(() => {
        });
          snack.onAction().subscribe(() => {
        });
        this.router.navigate(['/page/home']);
        }else{
          this.questionData=res;
          this.subTopicId = this.questionData.subTopic.id;
          let snack = this.snackBar.open("Question Added Successfully", "Done");
          snack.afterDismissed().subscribe(() => {
        });
          snack.onAction().subscribe(() => {
        });
        this.router.navigate(['/page/questionView/'+this.subTopicId]);
        }
      });
    }
  }

}
