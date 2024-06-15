import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Paths } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public http: HttpClient = inject(HttpClient);
  public router: Router = inject(Router);

  public isAuth = signal<boolean>(false);
  public user = signal<User>({} as User);
  public isLoading = signal<boolean>(false);
  public errorMessage = '';

  async register(
    email: string | null | undefined,
    name: string | null | undefined,
    password: string | null | undefined,
    phone: string | null | undefined
  ) {
    this.isLoading.set(true);
    this.http
      .post<any>(`${environment.URL_API}/user/registration`, {
        email,
        name,
        password,
        phone,
        role: 'USER',
      })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate([Paths.Signin]);
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  login(email: string | null | undefined, password: string | null | undefined) {
    this.isLoading.set(true);
    this.http
      .post<any>(`${environment.URL_API}/user/login`, {
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.isAuth.set(true);
          this.isLoading.set(false);
          this.router.navigate([Paths.Home]);
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading.set(false);
        },
        complete: () => {
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
          this.isLoading.set(false);
        },
      });
  }

  checkAuth() {
    this.http
      .get<{ token: string }>(`${environment.URL_API}/user/auth`)
      .subscribe({
        next: (res) => {
          console.log(res.token);
          localStorage.setItem('token', res.token);
          this.isAuth.set(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuth.set(false);
    this.user.set({} as User);
    this.router.navigate([Paths.Signin]);
  }
}
