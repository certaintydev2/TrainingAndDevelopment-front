import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assign-mentors-list',
  templateUrl: './assign-mentors-list.component.html',
  styleUrls: ['./assign-mentors-list.component.css']
})
export class AssignMentorsListComponent implements OnInit {

  constructor(private userService:UserService) { }
  
  assignMentorData:any;
  users:any;
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];

  ngOnInit(): void {
    this.getAssignMentorsList();
    this.userService.getAllUsers().subscribe(
      (res)=>{
      console.log(res);
      this.users = res;  
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }
  getAssignMentorsList() {
    this.userService.assignMentorList().subscribe(
      (res)=>{
        console.log(res);
        this.assignMentorData=res;
      }
    );
  }

  onTableDataChange(event:any) {
    this.page=event;
    this.getAssignMentorsList();
  }

  deleteAssignData(id:any) {
    
  }

}
