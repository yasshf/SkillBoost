import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourcesComponent } from './cources/cources.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { AuthGuard } from './auth.guard';
import { OAuth2CallbackComponent } from './oauth2-callback-component/oauth2-callback-component.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {path: '', 
  component: HomeComponent,
  canActivate: [AuthGuard] // Protect this route
},
{ 
  path: 'oauth2/callback', 
  component: OAuth2CallbackComponent 
},
  {
    path: 'courses', component: CourcesComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup', component: SignupComponent // Add the signup route here
  },
  { path: 'profile', component: ProfileManagementComponent }
  
];
