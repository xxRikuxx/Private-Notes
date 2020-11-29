import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CreateNewUser} from '../../shared/models/CreateNewUser';
import {Router} from '@angular/router';
import {ToastsComponent} from '../../shared/toasts/toasts.component';
import {ToastService} from '../../toast.service';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends ToastsComponent implements OnInit {
  account = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  user = new CreateNewUser();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, public toastService: ToastService) {
    super(toastService);
  }

  ngOnInit(): void {
  }

  signUp(): void {
    const {email, password} = this.account.value;
    this.authService.signUpUser(email, password).then(r => {
      this.router.navigate(['/']).then(w => console.log(w));
      this.showSuccess('Newly Created User!');
    }, (error) => {
      console.log(error);
      this.showDangerWithDelay(error, 10000);
    });
  }
}
