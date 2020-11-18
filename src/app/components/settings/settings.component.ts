import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';
import {ToastsComponent} from '../../shared/toasts/toasts.component';
import {ToastService} from '../../toast.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends ToastsComponent implements OnInit {

  modalReference;
  closeResult;
  fileName = 'Choose a File';
  profile: FormGroup;
  customFile;
  email;
  password;
  currentEmail = '';
  currentPwd = '';
  currentUser;
  updatedUserProfile = false;
  originalEmail: string;
  profileSrc;
  private originalProfileSrc: any = '../../../assets/amber-kipp-75715CVEJhI-unsplash.jpg';
  private rawProfileFile: File;

  constructor(public toastService: ToastService, private formBuilder: FormBuilder, private db: AngularFireDatabase, private storage: AngularFireStorage, private modalService: NgbModal, private authService: AuthService) {
    super(toastService);
    this.customFile = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.profile = formBuilder.group({
      customFile: this.customFile,
      email: this.email,
      password: this.password
    });
    this.currentUser = this.authService.getUserDetails();
    this.currentEmail = this.originalEmail = this.currentUser.email;
    console.log(this.currentUser.profile);
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

  onSubmit(): void {
    if (this.profileSrc && this.profileSrc.length > 0 && this.profileSrc !== this.originalProfileSrc) {
      const storageRef = this.storage.ref(this.currentUser.uid + '/profilePicture/' + this.fileName);

      const task = storageRef.put(this.rawProfileFile);
    }
    if (this.currentPwd.length > 0 && this.currentEmail.length > 0) {
      this.updatedUserProfile = this.updateEmail(this.currentEmail) && this.updatePwd(this.currentPwd);
    } else if (this.currentEmail && this.currentEmail.length > 0 && this.currentPwd.length === 0) {
      if (this.currentEmail !== this.originalEmail) {
        this.updatedUserProfile = this.updateEmail(this.currentEmail);
      }
    } else if (this.currentPwd && this.currentPwd.length > 0 && this.currentEmail.length === 0) {
      this.updatedUserProfile = this.updatePwd(this.currentPwd);

    }
    if (this.updatedUserProfile) {
      this.showSuccessWithDelay('Profile Successfully Updated', 5000);
    }
    this.modalReference.close();
  }

  onFileSelected($event): void {
    const event = $event.target;
    if (event.files && event.files[0]) {
      const file = this.rawProfileFile =  event.files[0];
      this.fileName = event.files[0].name;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        console.log(fileReader.result);
        return this.profileSrc = fileReader.result;
      };

      fileReader.readAsDataURL(file);
    }
  }

  updateEmail(currentEmail: string): boolean {
    return this.currentUser.updateEmail(currentEmail).then((res) => {
      console.log('Updating Email....', res);
      return true;
    }, err => {
      this.showDangerWithDelay(err, 5000);
      return false;
    });
  }


  updatePwd(currentPwd: string): boolean {
    return this.currentUser.updatePassword(currentPwd).then((res) => {
      console.log('Updating Pwd....', res);
      return true;
    }, err => {
      this.showDangerWithDelay(err, 5000);
      return false;
    });
  }
}
