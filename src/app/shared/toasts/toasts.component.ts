import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) {
  }

  ngOnInit(): void {
  }


  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {classname: 'bg-success text-light  mt-5', delay: 10000});
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {classname: 'bg-danger text-light', delay: 15000});
  }
  loggedIn(user) {
    this.toastService.show(`Successfully Logged In!`, {classname: 'bg-success text-light', delay: 5000});
  }

  loggedOut(user) {

  }
}
