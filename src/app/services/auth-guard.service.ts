import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthService)  { }

  canActivate(): boolean {
    if ( this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/']).then(r => console.log(r));
    return false;
  }
}
