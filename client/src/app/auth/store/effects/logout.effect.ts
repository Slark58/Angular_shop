import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logoutAction } from '../actions/logout.action';
import { tap } from 'rxjs';

export const logoutEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(logoutAction),
      tap(() => router.navigate(['/login']))
    );
  },
  { dispatch: false, functional: true }
);
