import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private router: Router) { }

  subTopic_id:any;
  questions:any;
  user: any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');
  check:Boolean=false;
  topic_id:any;
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];

  ngOnInit(): void {
    this.subTopic_id = this.route.snapshot.params['id'];
    this.getQuestions();
    this.userService.getUserById(this.loggedInUserId).subscribe(
      res => {
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
      });
  }

  getQuestions() {
    this.userService.getQuestionsBySubTopicId(this.subTopic_id).subscribe(
      (res)=>{
      this.questions = res;
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  onTableDataChange(event:any) {
    this.page=event;
    this.getQuestions();
  }
  
  backButton() {
    for (let i = 0; i < this.questions.length; i++) {
      this.topic_id=this.questions[i].subTopic.topic.id;
      console.log(this.questions[i].subTopic.topic.id);
      
    }
    this.router.navigate(['/page/subTopicView/'+this.topic_id]);
  }

  deleteQuestion(id:any) {
    if(id != null) {
      Swal.fire({
        title: 'Do you want to delete Question?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed === true) {
          this.userService.deleteQuestion(id).subscribe(
            (res)=>{

            },(err:HttpErrorResponse)=>{
              if(err.status===401){
                this.userService.logout();
              }
            }
          );
          setTimeout(() => {
            this.getQuestions();
          }, 1000);
        }
      })  
    }
  }
  
}
