import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-mentor',
  templateUrl: './assign-mentor.component.html',
  styleUrls: ['./assign-mentor.component.css']
})
export class AssignMentorComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar) { }

  profileList:any;
  mentorList:any;
  mentorByProfile:any[]=[];
  selectedProfile:any;
  traineeList:any;
  traineeByProfile:any[]=[];
  m=0;
  n=0;
  public assignMentor: any = {
    profile: '',
    traineeId: '',
    mentorId:''
  };

  ngOnInit(): void {
    this.userService.getMentorList().subscribe(
      (res)=>{
        console.log(res); 
        this.mentorList=res;
      }
    );
    this.userService.getTraineeList().subscribe(
      (res)=>{
        this.traineeList=res;
      }
    );
    this.userService.getAllProfile().subscribe(
      (res)=>{
        console.log(res); 
        this.profileList=res; 
      }
    );
  }


  AssignMentor(data:any) {
    console.log(data);
    if(data!=null) {
      this.userService.assignMentor(data).subscribe(
        (res)=>{
          let snack = this.snackBar.open("Mentor Assigned Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
          });
            snack.onAction().subscribe(() => {
          });
            this.router.navigate(['/page/assignMentorList']);
        }
      );
    }
  }

  updateList(){
    this.selectedProfile=this.assignMentor.profile;
    for (let i = 0; i < this.mentorList.length; i++) {
      for (let j = 0; j < this.mentorList[i].profile.length; j++) {
        if(this.selectedProfile===this.mentorList[i].profile[j].profileName){
          this.mentorByProfile[this.m]=this.mentorList[i];
          this.m++;
        }
      }
    }
    for (let i = 0; i < this.traineeList.length; i++) {
      for (let j = 0; j < this.traineeList[i].profile.length; j++) {
        if(this.selectedProfile===this.traineeList[i].profile[j].profileName){
          this.traineeByProfile[this.n]=this.traineeList[i];
          this.n++;
        }
      }
    }
    this.mentorList=this.mentorByProfile;
    this.traineeList=this.traineeByProfile;
  }

}
