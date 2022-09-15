import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perform-test',
  templateUrl: './perform-test.component.html',
  styleUrls: ['./perform-test.component.css']
})
export class PerformTestComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService) { }

  profile:any;
  questionsList:any

  ngOnInit(): void {
    this.profile = this.route.snapshot.params['profileName'];
    this.userService.getQuestionsByProfile(this.profile).subscribe(
      (res)=>{
        console.log(res);
        this.questionsList=res;
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
    );
  }

}
