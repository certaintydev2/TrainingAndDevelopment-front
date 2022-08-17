import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private userService:UserService , private router:Router) { }

  users:any;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
      this.users = res;   
    });
  }

  deleteUser(id:any) {
    if(id != null) {
      Swal.fire({
        title: 'Do you want to delete User?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed === true) {
          this.userService.deleteUser(id).subscribe();
          setTimeout(() => {
            this.getAllUsers();
          }, 1000);
        }
      })  
    }
  }

  updateUser(id:any){
    this.userService.getUserById(id).subscribe(
      (res)=>{
        console.log(res);
      }
    );
  }

}
