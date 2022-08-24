import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-sub-topic',
  templateUrl: './view-sub-topic.component.html',
  styleUrls: ['./view-sub-topic.component.css']
})
export class ViewSubTopicComponent implements OnInit {

  constructor(private userService:UserService) { }

  subTopics:any;

  ngOnInit(): void {
    this.userService.getSubTopics().subscribe((res)=>{
      console.log(res);
      this.subTopics = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

}
