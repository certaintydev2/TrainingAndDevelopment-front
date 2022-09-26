import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-refrence-link',
  templateUrl: './refrence-link.component.html',
  styleUrls: ['./refrence-link.component.css']
})
export class RefrenceLinkComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar) { }

  subTopicsList:any;
  refrenceData:any;
  subTopicId:any;

  public refrenceLink: any = {
    link: '',
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

  AddRefrenceLink(data:any) {
    if(data != null) {
      this.userService.addRefrenceLink(data).subscribe(
        (res)=>{
          this.refrenceData=res;
          this.subTopicId = this.refrenceData.subTopic.id;
          let snack = this.snackBar.open("Refrence Link Added Successfully", "Done");
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
