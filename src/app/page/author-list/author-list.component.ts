import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(private userService:UserService , private router:Router) { }

  users:any;

  ngOnInit(): void {
    this.getAuthorList();
  }

  getAuthorList() {
    this.userService.getAuthorList().subscribe(res=>{
      this.users = res;   
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    }
    );
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
          this.userService.deleteUser(id).subscribe(
            (res)=>{

            },(err:HttpErrorResponse)=>{
              if(err.status===401){
                this.userService.logout();
              }
            }
          );
          setTimeout(() => {
            this.getAuthorList();
          }, 1000);
        }
      })  
    }
  }

  updateUser(id:any){
    this.userService.getUserById(id).subscribe(
      (res)=>{
        console.log(res);
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
    );
  }


}
