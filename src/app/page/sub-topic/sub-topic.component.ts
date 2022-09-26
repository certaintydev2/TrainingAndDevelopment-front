import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sub-topic',
  templateUrl: './sub-topic.component.html',
  styleUrls: ['./sub-topic.component.css']
})
export class SubTopicComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar) { }

  topicsList:any;
  subTopicData:any;
  topicId:any;

  public subTopic: any = {
    subTopicName: '',
    topic: {
      topicName:''
    },
    subTopicDescription:'',
  };


  ngOnInit(): void {
    this.userService.getTopics().subscribe(
      (res)=>{
      console.log(res);
      this.topicsList = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  AddSubTopic(data:any) {
    if(data != null) {
      this.userService.addSubTopic(data).subscribe(
        (res)=>{
        if(res === null) {
          let snack = this.snackBar.open("SubTopic Already Added", "Done");
          snack.afterDismissed().subscribe(() => {
        });
          snack.onAction().subscribe(() => {
        });
        this.router.navigate(['/page/home']);
        }else{
          console.log(res);
          
          this.subTopicData=res;
          this.topicId=this.subTopicData.topic.id;
          let snack = this.snackBar.open("SubTopic Added Successfully", "Done");
          snack.afterDismissed().subscribe(() => {
        });
          snack.onAction().subscribe(() => {
        });
        this.router.navigate(['/page/subTopicView/'+this.topicId]);
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
