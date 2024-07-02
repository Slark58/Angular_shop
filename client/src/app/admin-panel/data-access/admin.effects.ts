import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from './admin.service';
import { AdminActions } from './admin.actions';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

export const getProductsEffect$ = createEffect(
  (actions$ = inject(Actions), adminService = inject(AdminService)) => {
    return actions$.pipe(
      ofType(AdminActions.getProducts),
      switchMap(() => {
        return adminService.getProducts().pipe(
          map((products) => AdminActions.getProductsSuccess({ products })),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
export const createProductsEffect$ = createEffect(
  (actions$ = inject(Actions), adminService = inject(AdminService)) => {
    return actions$.pipe(
      ofType(AdminActions.createProducts),
      switchMap(() => {
        return adminService.getProducts().pipe(
          map((products) => AdminActions.getProductsSuccess({ products })),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);

export const getUsersEffect$ = createEffect(
  (actions$ = inject(Actions), adminService = inject(AdminService)) => {
    return actions$.pipe(
      ofType(AdminActions.getUsers),
      switchMap(() => {
        return adminService.getUsers().pipe(
          map((users) => AdminActions.getUsersSuccess({ users })),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
