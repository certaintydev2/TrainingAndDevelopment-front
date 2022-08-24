import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) { }

  roles: any;
  errorMsg:any;
  msg:any;
  addUserData:any;

  public user: any = {
    name: '',
    email: '',
    userName: '',
    password: '',
    profile: '',
    roles: ''
  };
  coursesList:any=[
    {value: 'JAVA', courseName: 'JAVA'},
    {value: 'PYTHON', courseName: 'PYTHON'},
    {value: 'NODE JS', courseName: 'NODE JS'},
    {value: 'ANGULAR', courseName: 'ANGULAR'},
    {value: 'REACT JS', courseName: 'REACT JS'},
    {value: 'PHP', courseName: 'PHP'}
  ];

  routingLink:any;

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(
      (res) => {
      this.roles = res;
      console.log(this.roles);
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
  }

  formSubmit(data: any) {
    if (data.roles != '' && data.name != '' && data.userName != '', data.password != '', data.profile != '') {
      // console.log(data);
      
      this.userService.addUser(data).subscribe(
        (res) => {
          this.addUserData=res;        
          let snack = this.snackBar.open("User Added Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
            });
            snack.onAction().subscribe(() => {
            });
            this.prevoius();
        }, (err: HttpErrorResponse) => {
          if(err.status===401){
            this.userService.logout();
          }
        }
      );
    } else {
      this.errorMsg = "All fields Must be required";
      this.msg = true;
      this.router.navigate(['/page/addUser']);
    }
  }

  routePagesByRoles(data:any) {
    if(data.length>1) {
      this.routingLink='/page/viewAuthors';
      this.router.navigate(['/page/viewAuthors']);
    }else{
      for (let i = 0; i < data.length; i++) {
        if(data[i].roleName === "ROLE_TRAINEE"){
          this.routingLink='/page/viewTrainee';
            this.router.navigate(['/page/viewTrainee']);
        }
        if(data[i].roleName === "ROLE_AUTHOR"){
          this.routingLink='/page/viewAuthors';
          this.router.navigate(['/page/viewAuthors']);
        }
        if(data[i].roleName === "ROLE_MENTOR"){
          this.routingLink='/page/viewMentors';
        this.router.navigate(['/page/viewMentors']);
        }
      }
    }
  }

  prevoius() {
    window.history.back();
  }

}
