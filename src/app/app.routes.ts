import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {canActivate} from './guard/login.guard';
import {canActivateAdmin} from './guard/admin.guard';
import {RaceListComponent} from './races/race-list.component';
import {RaceFormComponent} from './races/race-form.component';
import {ApplicationListComponent} from './applications/application-list.component';
import {ApplicationFormComponent} from './applications/application-form.component';

export const routes: Routes = [
  // Public routes
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "reset-password/:token", component: ResetPasswordComponent},

  // Protected routes
  // Race screens
  {path: '', component: RaceListComponent, canActivate: [canActivate]},
  {path: 'races/new', component: RaceFormComponent, canActivate: [canActivateAdmin]},
  {path: 'races/:id/edit', component: RaceFormComponent, canActivate: [canActivateAdmin]},

  // Application screens
  {
    path: 'applications',
    component: ApplicationListComponent,
    canActivate: [canActivate]
  },
  {
    path: 'applications/new',
    component: ApplicationFormComponent,
    canActivate: [canActivate]
  },

  // Redirect to login for any other routes
  {path: "**", redirectTo: "login"}
];
