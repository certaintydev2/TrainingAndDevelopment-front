import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perform-question',
  templateUrl: './perform-question.component.html',
  styleUrls: ['./perform-question.component.css']
})
export class PerformQuestionComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService) { }

  courseName:any;
  questions:any;
  ngOnInit(): void {

    this.courseName = this.route.snapshot.params['courseName'];
  
    this.userService.getQuestionByCourseName(this.courseName).subscribe(res=>{
      console.log(res);
      
      this.questions=res;
    });
    
  }

}
