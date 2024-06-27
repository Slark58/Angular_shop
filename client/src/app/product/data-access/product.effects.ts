import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { ProductActions } from './product.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getProductByIdEffect$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(ProductActions.getProductById),
      switchMap(({ id }) => {
        return productService.getProductById(id).pipe(
          map((product) => ProductActions.getProductByIdSuccess({ product })),
          catchError(() => of(ProductActions.getProductByIdFailure()))
        );
      })
    );
  },
  { functional: true }
);
