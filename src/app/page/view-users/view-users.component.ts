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
  name:any;
  page:number=1

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res)=>{
      console.log(res);
      this.users = res;   
    },(err:HttpErrorResponse)=>{
      if(err.status===401){
        this.userService.logout();
      }
    });
  }

  search(){
    // if(this.name==""){
    //   this.getAllUsers();
    // }else{
    //   this.users=this.users.filter(
    //     res=>{
    //     return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
    //   })
    // }
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
      },(err:HttpErrorResponse)=>{
        if(err.status===401){
          this.userService.logout();
        }
      }
    );
  }

}
