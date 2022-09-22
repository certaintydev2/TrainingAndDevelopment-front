import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private snackBar: MatSnackBar,private router: Router) { }

  loggedInUserId: any = localStorage.getItem('id');
  questionId:any;


  ngOnInit(): void {

    this.questionId = this.route.snapshot.params['id'];
    console.log(this.questionId);
    
  }

  solveTest(data:any) {
    console.log(data);
    
    this.userService.solveTest(data.questionId,this.file).subscribe(
      (res)=>{
        console.log(res);
        
      }
    );
  }
file:any;

  submitFile(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }
  uploadFile() {
    
  }
}
