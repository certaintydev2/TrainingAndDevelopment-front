import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-sub-topic',
  templateUrl: './update-sub-topic.component.html',
  styleUrls: ['./update-sub-topic.component.css']
})
export class UpdateSubTopicComponent implements OnInit {

  constructor(private userService:UserService , private router: Router,private snackBar: MatSnackBar,private route:ActivatedRoute) { }


  subTopicId:any;
  subTopicData:any;
  subTopicName:any;
  topicsList:any;
  topicData:any;
  topicId:any;
  topicName:any;

  ngOnInit(): void {

    this.userService.getTopics().subscribe(res =>{
      console.log(res);
      
      this.topicsList = res;
    });
    this.subTopicId = this.route.snapshot.params['id'];
    
    this.userService.getSubTopicBySubTopicId(this.subTopicId).subscribe(res=>{
      console.log(res);
      this.subTopicData=res;
      this.subTopicName=this.subTopicData.subTopicName;
      this.topicData=this.subTopicData.topic;
      this.topicId=this.subTopicData.topic.id;
      this.topicName=this.subTopicData.topic.topicName;
    });
    
  }

  updateSubTopic(data:any) {

  }

  backButton() {
    this.router.navigate(['/page/subTopicView/'+this.topicId]);
  }
  
}
