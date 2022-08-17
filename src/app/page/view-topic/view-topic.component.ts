import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.css']
})
export class ViewTopicComponent implements OnInit {

  constructor(private userService:UserService) { }

  topics:any;
  users:any;

  ngOnInit(): void {
    this.userService.getTopics().subscribe(res=>{
      console.log(res);
      this.topics = res;
    });
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
      this.users = res;  
    });
  }

}
