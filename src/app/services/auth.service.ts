import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<any>;
  private userDetails: any = null;
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
     return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }


  // Create a New User
  signUpUser(email, password): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
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
    return this.firebaseAuth.sendPasswordResetEmail(emailAddress);
  }
}
