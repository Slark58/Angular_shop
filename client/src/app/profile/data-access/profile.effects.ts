import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from './profile.service';
import { ProfileActions } from './profile.actions';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

export const getAllCartItemsEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.getCartItems),
      switchMap(({ basketId }) => {
        return profileService.getAllCartItems(basketId).pipe(
          map((cartItems) => ProfileActions.getCartItemsSuccess({ cartItems })),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);

export const increaseCartItemEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.increaseCartItem),
      switchMap(({ basketId, productId }) => {
        return profileService.incrementProduct(productId, basketId).pipe(
          map(() => ProfileActions.increaseCartItemSuccess()),
          catchError(() => EMPTY)
        );
      })
    );
  },
  { functional: true }
);
