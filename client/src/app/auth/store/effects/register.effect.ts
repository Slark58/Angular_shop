import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/types/user.interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export const registerEffect$ = createEffect(
  (actions$ = inject(Actions), authServices = inject(AuthService)) => {
    return actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return authServices.register(request).pipe(
          tap(({ token, basket }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('basketId', basket.id.toString());
          }),
          map((res) => {
            localStorage.setItem('token', res.token);
            const user = jwtDecode<IUser>(res.token);
            console.log('User from logineffect:', user);
            return registerSuccessAction({ user });
          }),
          catchError((err: HttpErrorResponse) => {
            return of(registerFailureAction(err.error.message));
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(registerSuccessAction),
      tap(({}) => router.navigate(['/']))
    );
  },
  { dispatch: false, functional: true }
);
