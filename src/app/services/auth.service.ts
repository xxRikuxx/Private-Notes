import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private isLoading = new BehaviorSubject(true);

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;

    this.user.subscribe(user => {
      if (user !== undefined) {
        this.userDetails = user;
        console.log('Current User \n', this.userDetails);
        console.log('Sending.... loading stopped');
        this.isLoading.next(false);
      } else {
        this.userDetails = null;
      }
    });
  }

  getUserDetails(): any {
    return this.userDetails;
  }

  isUserLoading(): BehaviorSubject<any> {
    return this.isLoading;
  }

  // Sign In Authentication
  signInUser(email, password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }


  // Create a New User
  signUpUser(email, password): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(`${error}`);
    });
  }


  isLoggedIn(): boolean {
    return this.userDetails !== null;
  }

  logout(): void {
    this.firebaseAuth.signOut().then((res) => {
      console.log(res);
      return this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, err => console.log(err));
  }

  resetPassword(emailAddress: string): Promise<any> {
    return this.firebaseAuth.sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      return true;
    }).catch(error => {
      // An error happened.
      return error;
    });
  }
}
