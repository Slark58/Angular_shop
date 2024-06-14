import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export enum AuthPaths {
  Register = 'register',
  Login = 'login',
}

export const authRoutes: Routes = [
  {
    path: AuthPaths.Register,
    component: RegisterComponent,
  },
  {
    path: AuthPaths.Login,
    component: LoginComponent,
  },
];
