import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) { }


  roles: any;
  loggedId: any;
  errorMsg: any;
  msg: boolean = false;
  rolesList:any;

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


  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(res => {
      this.roles = res;
      this.adminRole(this.roles);
    });
    this.loggedId = localStorage.getItem('id');
  }

  adminRole(data:any) {
    for (let i = 0; i < data.length; i++) {
      if(data[i].roleName === "ROLE_ADMIN"){
        this.rolesList = [data[i]];
      }
    }
  }

  formSubmit(data: any) {
    if (data.roles != '' && data.name != '' && data.userName != '', data.password != '', data.profile != '') {
      console.log(data);
      this.userService.addUser(data).subscribe(
        (res) => {
          let snack = this.snackBar.open("User Registered Successfully", "Done");
          snack.afterDismissed().subscribe(() => {
          });
          snack.onAction().subscribe(() => {
          });
          this.router.navigate(['/auth/login']);
        }, (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    } else {
      this.errorMsg = "All fields Must be required";
      this.msg = true;
      this.router.navigate(['/auth/signup']);
    }
  }

}
