import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assessment-link',
  templateUrl: './assessment-link.component.html',
  styleUrls: ['./assessment-link.component.css']
})
export class AssessmentLinkComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar) { }


  subTopicsList:any;
  assessmentData:any;
  subTopicId:any;

  public assessmentLink: any = {
    assessmentLinks: '',
    subTopic: {
      id:''
    },
  };


  ngOnInit(): void {
    this.userService.getSubTopics().subscribe(
      (res)=>{
      this.subTopicsList = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  AddAssessmentLink(data:any) {
    if(data != null) {
      this.userService.addAssessmentLinks(data).subscribe(
        (res)=>{
          this.assessmentData=res;
          this.subTopicId = this.assessmentData.subTopic.id;
          let snack = this.snackBar.open("Assessment Link Added Successfully", "Done");
          snack.afterDismissed().subscribe(() => {
        });
          snack.onAction().subscribe(() => {
        });
        this.router.navigate(['/page/subTopicData/'+this.subTopicId]);
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
      );
    }
  }

}
