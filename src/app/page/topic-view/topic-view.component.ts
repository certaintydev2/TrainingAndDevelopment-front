import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit {

  constructor(private route:ActivatedRoute , private userService:UserService,private router: Router) { }

  courseId:any;
  topics:any;
  users:any;
  user: any;
  userRoleList:any;
  userData: any;
  loggedInUserData: any;
  loggedInUserId: any = localStorage.getItem('id');
  check:Boolean=false;

  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.getTopics();
   
    this.userService.getAllUsers().subscribe(
      (res)=>{
      console.log(res);
      this.users = res;  
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
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
        }
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
      );
  }

  onTableDataChange(event:any) {
    this.page=event;
    this.getTopics();
  }

  getTopics(){
    this.userService.getTopicsByCourseId(this.courseId).subscribe(res=>{
      console.log("topics",res);
      this.topics = res;
    });
  }

  deleteTopic(courseId:any) {
    if(courseId != null) {
      Swal.fire({
        title: 'Do you want to delete Topic?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed === true) {
          this.userService.deleteTopic(courseId).subscribe(
            (res) =>{
              
            },(err:HttpErrorResponse)=>{
              if(err.status===401){
                this.userService.logout();
              }
            }
          );
          setTimeout(() => {
            this.getTopics();
          }, 1000);
        }
      })  
    }
  }


  backButton() {
    this.router.navigate(['/page/viewCourse']);
  }

}
