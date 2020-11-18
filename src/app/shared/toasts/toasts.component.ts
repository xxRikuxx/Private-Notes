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


  showStandard(): void {
    this.toastService.show('I am a standard toast');
  }

  showSuccess(msg: string): void {
    this.toastService.show(msg, {classname: 'bg-success text-light  mt-5', delay: 1000});
  }

  showDanger(dangerTpl): void {
    this.toastService.show(dangerTpl, {classname: 'bg-danger text-light', delay: 1000});
  }

  showSuccessWithDelay(msg: string, delayBy: number): void {
    this.toastService.show(msg, {classname: 'bg-success text-light  mt-5', delay: delayBy});
  }

  showDangerWithDelay(dangerTpl: string, delayBy: number): void {
    this.toastService.show(dangerTpl, {classname: 'bg-danger text-light', delay: delayBy});
  }
  loggedIn(): void {
    this.toastService.show(`Successfully Logged In!`, {classname: 'bg-success text-light', delay: 1000});
  }

  loggedOut(user): void{

  }
}
