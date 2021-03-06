import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';
import {ToastsComponent} from '../../shared/toasts/toasts.component';
import {ToastService} from '../../toast.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProfilepicService} from '../../services/profilepic.service';

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
  currentEmail = '';
  currentPwd = '';
  currentUser;
  updatedUserProfile = false;
  originalEmail: string;
  profileSrc;
  private originalProfileSrc: any = '../../assets/icons/default-profile.png';
  private rawProfileFile: File;
  isLoading: boolean;
  didThemeChange = false;
  selectedOption = true;
  @Output() notifyTheme: EventEmitter<any> = new EventEmitter<any>();
  private theme = '';
  private timeOut = null;


  constructor(public toastService: ToastService, private profilepicService: ProfilepicService, private formBuilder: FormBuilder, private db: AngularFireDatabase, private storage: AngularFireStorage, private modalService: NgbModal, private authService: AuthService) {
    super(toastService);
    this.customFile = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.profile = formBuilder.group({
      customFile: this.customFile,
      email: this.email,
    });

    const user = this.currentUser = this.authService.getUserDetails();
    if (user) {
      // console.log(this.currentUser.profile);
      this.currentEmail = this.originalEmail = this.currentUser.email;
    }
    if (user && user.hasOwnProperty('photoURL')) {
      if (user.photoURL === null || user.photoURL === undefined || user.photoURL.length === 0) {
        this.profileSrc = null;
      } else {
        this.storage.ref(user.photoURL).getDownloadURL().subscribe(image => {
          console.log(image);
          this.profileSrc = image;
          this.originalProfileSrc = this.profileSrc;
        });
      }
    }
  }

  ngOnInit(): void {
    const body = document.body;
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'dark') {
        if (body.classList.contains('light')) {
          body.classList.replace('light', 'dark');
          this.theme = 'dark';
          this.notifyTheme.next('moon');
          this.selectedOption = false;
        }
      }
    }
  }

  resetPassword(): void {
    if (this.currentEmail) {
      console.log('Reset Password: Email Link sent to ---> ', this.currentEmail);
      this.authService.resetPassword(this.currentEmail).then((result) => {
        if (result) {
          this.showSuccess('Reset Password Link Sent!');
        }
      }, (err) => {
        this.showDangerWithDelay(err, 5000);
      });
    }
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
      const body = document.body;
      if (this.didThemeChange) {
        console.log('Theme not saved, revert to previous theme');
        if (this.theme === 'dark') {
          if (body.classList.contains('dark')) {
            body.classList.replace('dark', 'light');
            this.selectedOption = true;
            this.notifyTheme.next('sun');
          }
        }
        if (this.theme === 'light') {
          if (body.classList.contains('light')) {
            body.classList.replace('light', 'dark');
            this.selectedOption = false;
            this.notifyTheme.next('moon');
          }
        }
      }

      console.log(this.closeResult);
      this.didThemeChange = false;

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
      console.log(this.fileName);
      const path = this.currentUser.uid + '/profilePicture/' + this.fileName;
      const storageRef = this.storage.ref(path);
      this.profilepicService.insertProfilePic(this.profileSrc);
      this.currentUser.updateProfile({
        photoURL: path
      }).then(success => {
        console.log(success);
      }, err => console.log(err));
      const task = storageRef.put(this.rawProfileFile).then((profile) => {
        console.log(`Set Profile Picture of User: ${this.currentUser.photoURL}`);
      });
      this.updatedUserProfile = true;
    }
    if (this.currentPwd.length > 0 && this.currentEmail.length > 0) {
      this.updatedUserProfile = this.updateEmail(this.currentEmail) && this.updatePwd(this.currentPwd);
    } else if (this.currentEmail && this.currentEmail.length > 0 && this.currentPwd.length === 0) {
      if (this.currentEmail !== this.originalEmail) {
        this.updatedUserProfile = this.updateEmail(this.currentEmail);
      }
    }
    if (this.updatedUserProfile) {
      this.modalReference.close();
      this.showSuccessWithDelay('Profile Successfully Updated', 5000);
    }

    if (this.didThemeChange)  {
      localStorage.setItem('theme', this.theme);
      this.didThemeChange = false;
      this.modalReference.close();
    }
  }

  onFileSelected($event): void {
    const event = $event.target;
    if (event.files && event.files[0]) {
      const file = this.rawProfileFile = event.files[0];
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

  selectedTheme(value: string): void {
    const body = document.body;
    if (value === 'moon') {
      if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        this.didThemeChange = true;
        this.theme = 'dark';
        this.notifyTheme.next(value);
        this.selectedOption = false;
      }
    }
    if (value === 'sun') {
      if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light');
        this.didThemeChange = true;
        this.theme = 'light';
        this.notifyTheme.next(value);
        this.selectedOption = true;
      }
    }
    console.log(value);
  }

  checkIfValidEmail(): void {
    // clearTimeout(this.timeOut);
    // this.timeOut = setTimeout(() => {
    //   console.log('User done typing ', this.currentEmail);
    //   this.currentUser.checkIfValidEmail().currentEmail(this.currentEmail).then((res) => {
    //     return true;
    //   }, err => this.showDangerWithDelay(err, 5000));
    // }, 2000);
  }

}
