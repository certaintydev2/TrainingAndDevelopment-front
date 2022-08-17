import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css']
})
export class SendOtpComponent implements OnInit {

  constructor(private userService:UserService , private router:Router) { }

  public otpData: any = {
    email: '',
  };

  opt:any;

  ngOnInit(): void {
  }

  sendOtp(data:any){
    // debugger;

    if(data != null) {
      this.userService.sendOtp(data).subscribe(res =>{
        this.opt=res;
        localStorage.setItem('otp',this.opt);
        localStorage.setItem('email',this.otpData.email);
        this.router.navigate(['/auth/verifyOtp']);
      });

    }

  }

}
