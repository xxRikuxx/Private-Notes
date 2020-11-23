import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProfilepicService} from '../services/profilepic.service';
import {calcPossibleSecurityContexts} from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profileSrc;

  @Output() notifyTheme: EventEmitter<any> = new EventEmitter<any>();
  lightTheme: boolean = true;
  darkTheme: boolean = false;

  constructor(public authService: AuthService, private storage: AngularFireStorage, private profilePicService: ProfilepicService) {
    const user = this.authService.getUserDetails();
    if (user && user.hasOwnProperty('photoURL')) {
      if (user.photoURL === null || user.photoURL === undefined || user.photoURL.length === 0) {
        this.profileSrc = null;
      } else {
        this.storage.ref(user.photoURL).getDownloadURL().subscribe(image => {
          console.log(image);
          this.profileSrc = image;
        });
      }
    }
    profilePicService.getProfileObservable().subscribe((picture) => {
      this.profileSrc = picture;
    });
    // if (user.photoURL === undefined || user.photoURL === null) {
    //   this.profileSrc = null;
    // } else {
    //   this.profileSrc = user.photoURL;
    // }
  }

  ngOnInit(): void {
  }

  logout(): void {
    if (this.darkTheme) {
      const body = document.body;
      body.classList.replace('dark', 'light');
    }
    this.authService.logout();
  }

  getTheme(value: any): void {
    if (value === 'moon') {
      console.log('The dark theme!! ~ Navbar');
      this.lightTheme = false;
      this.darkTheme = true;
      this.notifyTheme.next(value);
    }
    if (value === 'sun') {
      console.log('The light theme!! ~ Navbar');
      this.lightTheme = true;
      this.darkTheme = false;
      this.notifyTheme.next(value);
    }
  }
}
