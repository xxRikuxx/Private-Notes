import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProfilepicService} from '../services/profilepic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profileSrc;

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

  logout() {
    this.authService.logout();
  }
}
