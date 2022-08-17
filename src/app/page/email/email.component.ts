import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private userService: UserService , private router:Router) { }


  public emailData:any = {
    email:'',
    subject:'',
    text:'',
    file:''
  }
  datamax:any
  file:any;
  filePath:any;

  ngOnInit(): void {
  }

  
  
  

  sendEmailData(data:any) {
    // debugger;

   if(data != null) {
     this.userService.sendEmail(data).subscribe(
       (res)=>{
      console.log(res);
      this.router.navigate(['/page/home']);
     },(err:HttpErrorResponse)=>{
       console.log(err);
     }
     );
   }
  }

}
