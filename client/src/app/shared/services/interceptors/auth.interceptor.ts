import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthService } from "../auth.service";
import { inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

export class AuthInterceptor implements HttpInterceptor {
  authService: AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
