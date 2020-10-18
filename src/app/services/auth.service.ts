import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;

    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log('Current User \n', this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
  }

  getUserDetails() {
    return this.userDetails;
  }
  // Sign In Authentication
  signInUser(email, password): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
      });
  }


  // Create a New User
  signUpUser(email, password): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(`${error}`);
    });
  }


  isLoggedIn(): boolean{
    return this.userDetails !== null;
  }

  logout() {
    this.firebaseAuth.signOut().then((res) => {
      return this.router.navigate(['/']);
    });
  }

}
