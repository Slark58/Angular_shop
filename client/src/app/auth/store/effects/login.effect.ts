import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/types/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const loginEffect$ = createEffect(
  (actions$ = inject(Actions), authServices = inject(AuthService)) => {
    return actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return authServices.login(request).pipe(
          map((res) => {
            localStorage.setItem('token', res.token);
            const user = jwtDecode<IUser>(res.token);
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

export const redirectAfetrLogin$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(loginSuccessAction),
      tap(({ user }) => console.log('log from 1 tap: ', user)),
      tap(() => router.navigate(['/']))
    );
  },
  { dispatch: false, functional: true }
);
