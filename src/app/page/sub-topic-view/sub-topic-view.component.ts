import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sub-topic-view',
  templateUrl: './sub-topic-view.component.html',
  styleUrls: ['./sub-topic-view.component.css']
})
export class SubTopicViewComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private router: Router) { }

  topic_id:any;
  course_id:any;
  subTopics:any;
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
  topicName:any;
  esimatedTime:any;
  topicDescription:any;

  ngOnInit(): void {
    this.topic_id = this.route.snapshot.params['id'];
    this.getSubTopics();
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
  }

  getSubTopics(){
    this.userService.getSubTopicsByTopicId(this.topic_id).subscribe(
      (res)=>{
      console.log(res);
      this.subTopics = res;
      this.topicName=this.subTopics[0].topic.topicName.toUpperCase();
      this.esimatedTime=this.subTopics[0].topic.days+" "+this.subTopics[0].topic.estimatedTime;
      this.topicDescription=this.subTopics[0].topic.topicDescription;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  deleteSubTopic(id:any) {
    if(id != null) {
      Swal.fire({
        title: 'Do you want to delete SubTopic?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed === true) {
          this.userService.deleteSubTopic(id).subscribe(
            (res)=>{

            },(err:HttpErrorResponse)=>{
                  if(err.status===401){
                    this.userService.logout();
                  }
            }
          );
          setTimeout(() => {
            this.getSubTopics();
          }, 1000);
        }
      })  
    }
  }

  onTableDataChange(event:any) {
    this.page=event;
    this.getSubTopics();
  }
  backButton() {
    for (let i = 0; i < this.subTopics.length; i++) {
      console.log(this.subTopics[i].topic.course.courseId);
      
      this.course_id=this.subTopics[i].topic.course.courseId;
    }
    this.router.navigate(['/page/topicView/'+this.course_id]);
  }

}
