import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


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

  ngOnInit(): void {
    this.subTopic_id = this.route.snapshot.params['id'];
    this.userService.getQuestionsBySubTopicId(this.subTopic_id).subscribe(res=>{
      console.log(res);
      this.questions = res;
    });
    this.userService.getUserById(this.loggedInUserId).subscribe(
      res => {
        this.userData = JSON.stringify(res);
        this.loggedInUserData = JSON.parse(this.userData);
        this.user = this.loggedInUserData.name;
        this.userRoleList = this.loggedInUserData.roles;
        for (let i = 0; i < this.userRoleList.length; i++) {
            if(this.userRoleList[i].roleName==="ROLE_MENTOR"){
              this.check = true;
          }
        }
      });
  }
  
  backButton() {
    for (let i = 0; i < this.questions.length; i++) {
      this.topic_id=this.questions[i].subTopic.topic.id;
    }
    this.router.navigate(['/page/subTopicView/'+this.topic_id]);
  }
  
}
