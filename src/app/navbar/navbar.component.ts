import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profileSrc;
  constructor(public authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user.photoURL === undefined || user.photoURL === null) {
      this.profileSrc = null;
    } else {
      this.profileSrc = user.photoURL;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
