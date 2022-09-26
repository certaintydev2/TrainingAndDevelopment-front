import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sub-topic-view-data',
  templateUrl: './sub-topic-view-data.component.html',
  styleUrls: ['./sub-topic-view-data.component.css']
})
export class SubTopicViewDataComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private router: Router) { }

  subTopic_id:any;
  topic_id:any;
  course_id:any;
  subTopics:any;
  subTopicData:any;
  user: any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');
  check:Boolean=false;
  page:number=1;
  count:number=0;
  tableSize:number=3;
  tableSizes:any=[5,10,15,20];
  subTopicName:any;
  esimatedTime:any;
  subTopicDescription:any;
  refrenceLinks:any;
  assessmentLinks:any;

  ngOnInit(): void {
    this.subTopic_id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (res) => {
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.userRoleList = this.loggedInUserData.roles;
        for (let i = 0; i < this.userRoleList.length; i++) {
            if(this.userRoleList[i].roleName==="ROLE_AUTHOR"){
              this.check = true;
          }
          if(this.userRoleList[i].roleName==="ROLE_ADMIN"){
            this.check = true;
        }
        }
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
      );
    this.userService.getSubTopicBySubTopicId(this.subTopic_id).subscribe(
      (res)=>{
        console.log(res);
        this.subTopicData=res;
        this.subTopicName=this.subTopicData.subTopicName;
        this.subTopicDescription=this.subTopicData.subTopicDescription;
      }
    );
    this.getRefrenceLinks();
    this.getAssessmentLinks();
  }

  getRefrenceLinks() {
    this.userService.getRefrenceBySubTopicId(this.subTopic_id).subscribe(
      (res)=>{
        console.log(res);
        this.refrenceLinks=res;
      }
    );
  }

  getAssessmentLinks() {
    this.userService.getAssessmentLinksBySubTopicId(this.subTopic_id).subscribe(
      (res)=>{
        console.log(res);
        this.assessmentLinks=res;
      }
    );
  }

  onTableDataChange(event:any) {
    this.page=event;
  }
  backButton() {
   window.history.back();
  }


}
