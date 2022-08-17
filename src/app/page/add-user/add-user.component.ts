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
  coursesList:any;
  errorMsg:any;
  msg:any;

  public user: any = {
    name: '',
    email: '',
    userName: '',
    password: '',
    profile: '',
    roles: ''
  };

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(res => {
      this.roles = res;
      console.log(this.roles);
    });
    this.userService.getCourses().subscribe(res => {
      console.log(res);
      this.coursesList = res;
    });
  }

  formSubmit(data: any) {
    if (data.roles != '' && data.name != '' && data.userName != '', data.password != '', data.profile != '') {
      this.userService.addUser(data).subscribe(
        (res) => {
          console.log(res);          
          let snack = this.snackBar.open("User Added Successfully", "Done");
            snack.afterDismissed().subscribe(() => {
            });
            snack.onAction().subscribe(() => {
            });
            this.router.navigate(['/page/viewUsers']);
        }, (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    } else {
      this.errorMsg = "All fields Must be required";
      this.msg = true;
      this.router.navigate(['/page/addUser']);
    }
  }

}
