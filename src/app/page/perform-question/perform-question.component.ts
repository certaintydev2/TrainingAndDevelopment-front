import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perform-question',
  templateUrl: './perform-question.component.html',
  styleUrls: ['./perform-question.component.css']
})
export class PerformQuestionComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService) { }

  courseName:any;
  questions:any;
  statusData:any[]=[];
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];
  ngOnInit(): void {

    this.courseName = this.route.snapshot.params['courseName'];
  
    this.userService.getQuestionByCourseName(this.courseName).subscribe(
      (res)=>{
      this.questions=res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  onTableDataChange(event:any) {
    this.page=event;
    this.ngOnInit();
  }
}
