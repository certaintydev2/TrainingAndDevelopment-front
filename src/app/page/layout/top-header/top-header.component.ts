import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  constructor(private router: Router) { }
  value = 'Search here...';

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


}
