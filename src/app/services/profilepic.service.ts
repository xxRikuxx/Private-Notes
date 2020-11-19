import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilepicService {

  profilePic = new Subject();

  constructor() {
  }


  getProfileObservable(): Observable<any> {
    return this.profilePic.asObservable();
  }

  insertProfilePic(data): void {
    this.profilePic.next(data);
  }
}
