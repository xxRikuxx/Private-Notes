import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../../toast.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainerComponent{

  constructor(public toastService: ToastService) { }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
