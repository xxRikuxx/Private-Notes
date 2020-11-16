import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  modalReference;
  closeResult;
  fileName = 'Choose a File';
  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  resetPassword(key: string): void {

  }

  open(content): void {
    this.modalReference = this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      // console.log(this.createNote.value);
      // this.generateNote(this.createNote.value);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {

  }

  onFileSelected($event) {
    const event = $event.target;
    if (event.files.length > 0) {
      this.fileName = event.files[0].name;
    }
  }
}
