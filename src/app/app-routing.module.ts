import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuardService} from './services/auth-guard.service';
import {SettingsComponent} from './components/settings/settings.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SignUpComponent} from './components/sign-up-component/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
