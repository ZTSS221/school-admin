import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userDetails: any;

  items = [
    {
      label: 'Profile',
      command: () => {
        // this.update();
      },
    },
    {
      label: 'Logout',
      command: () => {
        this.logOut();
      },
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.userDetails = localStorage['userDetails'];
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    this.router.navigate(['/auth/login']);
  }
}
