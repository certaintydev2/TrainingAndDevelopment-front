import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {

  constructor(private userService:UserService , private router:Router) { }

  users:any;
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20];

  ngOnInit(): void {
    this,this.getMentorList();
  }

  onTableDataChange(event:any) {
    this.page=event;
    this.getMentorList();
  }

  getMentorList() {
    this.userService.getMentorList().subscribe(res=>{
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
          this.userService.deleteUser(id).subscribe(
            (res)=>{

            },(err:HttpErrorResponse)=>{
              if(err.status===401){
                this.userService.logout();
              }
            }
          );
          setTimeout(() => {
            this.getMentorList();
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
