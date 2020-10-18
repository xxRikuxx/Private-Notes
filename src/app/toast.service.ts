import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  successMessage = new Subject();


  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }



}
