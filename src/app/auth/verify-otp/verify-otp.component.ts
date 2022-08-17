import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  constructor(private router:Router) { }

  otpData:any;

  otp:any = localStorage.getItem('otp');

  ngOnInit(): void {
  }

  verifyOtp(data:any) {
      if(data != null) {
        if(data.otp === this.otp) {
          this.router.navigate(['/auth/changePassword']);
          // localStorage.clear(); 
        }
      }
  }

}
