import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { AdminUsersActions } from './admin-users.actions';
import { AdminUsersService } from './admin-users.service';

export const getUsersEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    adminUsersService = inject(AdminUsersService)
  ) => {
    return actions$.pipe(
      ofType(AdminUsersActions.getUsers),
      switchMap(() => {
        return adminUsersService.getUsers().pipe(
          map((users) => AdminUsersActions.getUsersSuccess({ users })),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
