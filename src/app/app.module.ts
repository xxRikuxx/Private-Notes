import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment, firebaseConfig} from '../environments/environment';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignUpComponent } from './components/sign-up-component/sign-up.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuardService} from './services/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastsContainerComponent } from './shared/toasts-container/toasts-container.component';
import { ToastsComponent } from './shared/toasts/toasts.component';
import {AgGridModule} from 'ag-grid-angular';
import { GenerateNoteComponent } from './generate-note/generate-note.component';
import {HttpClientModule} from '@angular/common/http';
import { DeleteBtnComponent } from './components/dashboard/delete-btn/delete-btn.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import * as firebase from 'firebase/app';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    PageNotFoundComponent,
    SignUpComponent,
    NavbarComponent,
    ToastsContainerComponent,
    ToastsComponent,
    GenerateNoteComponent,
    DeleteBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    AgGridModule.withComponents([]),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}
