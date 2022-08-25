import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  roleList:any=[
    {value: 'ROLE_ADMIN', roleName: 'ROLE_ADMIN'},
    {value: 'ROLE_AUTHOR', roleName: 'ROLE_AUTHOR'},
    {value: 'ROLE_MENTOR', roleName: 'ROLE_MENTOR'},
    {value: 'ROLE_TRAINEE', roleName: 'ROLE_TRAINEE'}
  ];
  public role: any = {
    roleName: ''
  };

  ngOnInit(): void {
  }
  addRole(data:any){
    this.userService.addRole(data).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/auth/login']);
    });
  }
}
