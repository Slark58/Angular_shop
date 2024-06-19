import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { environment } from '../../../environments/environment.development';
import { Paths } from '../../app.routes';
import { AuthResponse } from '../types/authRes.interface';
import { IRegisterRequest } from '../types/registerReq.interface';
import { ILoginRequest } from '../types/loginReq.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  register(data: IRegisterRequest): Observable<AuthResponse> {
    const url = environment.URL_API + '/user/registration';
    console.log('service auth: ', data);

    return this.http.post<AuthResponse>(url, data);
  }

  login(data: ILoginRequest): Observable<AuthResponse> {
    const url = environment.URL_API + '/user/login';
    console.log('service auth: ', data);

    return this.http.post<AuthResponse>(url, data);
  }

  checkAuth() {
    const url = environment.URL_API + '/user/auth';
    return this.http.get<{ token: string }>(url);
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.isAuth.set(false);
  //   this.user.set({} as User);
  //   this.router.navigate([Paths.Signin]);
  // }
}
