import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CatalogActions } from './catalog.actions';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CatalogService } from './catalog.service';

export const getProductsEffect$ = createEffect(
  (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
    return actions$.pipe(
      ofType(CatalogActions.getProducts),
      switchMap(({ filters }) => {
        return catalogService.getPropducts(filters).pipe(
          map((products) => {
            return CatalogActions.getProductsSuccess({ products });
          }),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
export const getFiltersEffect$ = createEffect(
  (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
    return actions$.pipe(
      ofType(CatalogActions.getFilters),
      switchMap(() => {
        return catalogService.getFilters().pipe(
          map((filters) => {
            return CatalogActions.getFiltersSuccess({ filters });
          }),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
