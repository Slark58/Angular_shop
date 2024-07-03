import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  checkAuthAction,
  checkAuthFailureAction,
  checkAuthSuccessAction,
} from '../actions/checkAuth.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/types/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const checkAuthEffect$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(checkAuthAction),
      switchMap(() => {
        return authService.checkAuth().pipe(
          tap(({ token }) => localStorage.setItem('token', token)),
          map(({ token }) => {
            const user = jwtDecode<IUser>(token);
            console.log(user);
            return checkAuthSuccessAction({ user });
          }),
          catchError(() => of(checkAuthFailureAction()))
        );
      })
    );
  },
  { functional: true }
);
