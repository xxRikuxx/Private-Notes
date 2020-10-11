import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateNewUser} from '../shared/models/CreateNewUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  profile = new CreateNewUser();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    const {email, password} = this.account.value;
    this.authService.signInUser(email, password).then(r => console.log(r));
    this.router.navigate(['/dashboard']).then(r => console.log(r));
  }
}
