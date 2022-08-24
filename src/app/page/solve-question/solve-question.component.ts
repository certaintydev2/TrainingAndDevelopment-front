import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-solve-question',
  templateUrl: './solve-question.component.html',
  styleUrls: ['./solve-question.component.css']
})
export class SolveQuestionComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private router: Router,private snackBar: MatSnackBar) { }


  questionId:any;
  loggedInUserId: any = localStorage.getItem('id');
  userData:any;
  loggedInUserData:any;
  userprofile:any;

  status:any[]=[
    {value:"Done",statusValue:"Done"},
    {value:"Pending",statusValue:"Pending"},
    {value:"Progress",statusValue:"Progress"}
  ];


  public questionStatus: any = {
    status: '',
    userId:this.loggedInUserId
  };

  ngOnInit(): void {
    this.questionId=this.route.snapshot.params['id'];;
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.userprofile = this.loggedInUserData.profile;
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
      );
  }

  solveQuestion(data:any) {
    console.log(data);
    this.userService.solveQuestion(this.questionId,data).subscribe(
      (res)=>{
      console.log(res); 
      let snack = this.snackBar.open("Status Updated Successfully", "Done");
      snack.afterDismissed().subscribe(() => {
    });
      snack.onAction().subscribe(() => {
    });
    this.router.navigate(['/page/performQuestion/'+this.userprofile]);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  backButton() {
    this.router.navigate(['/page/performQuestion/'+this.userprofile]);
  }

}
