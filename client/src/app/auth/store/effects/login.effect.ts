import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/types/User.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const loginEffect$ = createEffect(
  (actions$ = inject(Actions), authServices = inject(AuthService)) => {
    return actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return authServices.login(request).pipe(
          map((token) => {
            localStorage.setItem('token', token);
            const user = jwtDecode<IUser>(token);
            console.log('User from logineffect:', user);
            return loginSuccessAction({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ error: errorResponse.error.message })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
