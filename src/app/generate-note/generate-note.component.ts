import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../shared/models/Note';
@Component({
  selector: 'app-generate-note',
  templateUrl: './generate-note.component.html',
  styleUrls: ['./generate-note.component.scss']
})
export class GenerateNoteComponent implements OnInit {
  public notes: AngularFireList<Note[]>;
  closeResult = "";
  constructor(private db: AngularFireDatabase, private modalService: NgbModal) {
    this.notes = this.db.list('/notes');
   }

  ngOnInit(): void {
  }

  open(content): void {
    this.generateNote(null);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  generateNote(data: any): void {
    // this.
    const note: any = new Note("foobar", "descriptoin", "category", "date");
    this.notes.push(note);
  }

}
