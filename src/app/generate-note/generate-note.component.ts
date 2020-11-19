import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../shared/models/Note';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsComponent} from '../shared/toasts/toasts.component';
import {ToastService} from '../toast.service';
import moment from 'moment';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-generate-note',
  templateUrl: './generate-note.component.html',
  styleUrls: ['./generate-note.component.scss']
})
export class GenerateNoteComponent extends ToastsComponent implements OnInit {
  public notes: AngularFireList<Note[]>;
  closeResult = '';
  private createNote: FormGroup;
  private title: FormControl;
  private category: FormControl;
  private description: FormControl;
  modalReference: any;
  disabled: boolean;

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private modalService: NgbModal, public toastService: ToastService, private authService: AuthService) {
    super(toastService);
    const user = this.authService.getUserDetails();
    this.notes = this.db.list(user.uid + '/notes');
    this.title = new FormControl('', [Validators.required]);
    this.category = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.disabled = true;
    this.createNote = formBuilder.group({
      title: this.title,
      category: this.category,
      description: this.description
    });

  }

  ngOnInit(): void {
  }

  open(content): void {
    this.modalReference = this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      console.log(this.createNote.value);
      this.generateNote(this.createNote.value);
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

  generateNote({title, category, description}): void {
    const note: any = new Note(title, description, category, moment().format('MMMM Do YYYY, h:mm:ss a'));
    this.notes.push(note).then((response) => {
      console.log(note);
      this.showSuccess('Note Saved!');
    }, (err) => {
        this.showDanger('Note Failed To Save');
    });

  }

  onSubmit() {
    if (this.title.valid && this.category.valid && this.description.valid) {
      this.modalReference.close();
    } else {
      console.log(this.title.valid );
      console.log(this.category.valid);
      console.log(this.description.valid);
    }
  }
}
