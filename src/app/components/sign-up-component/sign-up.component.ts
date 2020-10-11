import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CreateNewUser} from '../../shared/models/CreateNewUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  account = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  user = new CreateNewUser();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.authService.signUpUser(this.user.email, this.user.password).then(r => {
      console.log(r);
    });
    this.router.navigate(['/']).then(r => console.log(r));
  }
}
