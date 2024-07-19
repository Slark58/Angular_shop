import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminProductsActions } from './admin-products.actions';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { AdminProductsService } from './admin-products.service';

export const getProductsEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    adminProductsService = inject(AdminProductsService)
  ) => {
    return actions$.pipe(
      ofType(AdminProductsActions.getProducts),
      switchMap(() => {
        return adminProductsService.getProducts().pipe(
          map((products) =>
            AdminProductsActions.getProductsSuccess({ products })
          ),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
export const createProductsEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    adminProductsService = inject(AdminProductsService)
  ) => {
    return actions$.pipe(
      ofType(AdminProductsActions.createProduct),
      switchMap(({ product }) => {
        return adminProductsService.createProduct(product).pipe(
          map(() => AdminProductsActions.createProductSuccess()),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
