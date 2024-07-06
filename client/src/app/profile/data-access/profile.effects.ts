import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from './profile.service';
import { ProfileActions } from './profile.actions';
import { EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { PersistService } from '../../shared/services/persist.service';
import { ActionCreator } from '@ngrx/store';

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
      switchMap(({ basketId, productId, sizeId }) => {
        return profileService
          .incrementProduct(productId, basketId, sizeId)
          .pipe(
            map(() => ProfileActions.increaseCartItemSuccess()),
            catchError(() => EMPTY)
          );
      })
    );
  },
  { functional: true }
);

const warpperAfterActionEffect = (action: string | ActionCreator) => {
  const getCartItemsAfetrAction = createEffect(
    (actions$ = inject(Actions), persistService = inject(PersistService)) => {
      return actions$.pipe(
        ofType(action),
        map(() =>
          ProfileActions.getCartItems({
            basketId: persistService.get('backetId') as number,
          })
        )
      );
    },
    { functional: true }
  );

  return getCartItemsAfetrAction;
};

warpperAfterActionEffect(ProfileActions.increaseCartItemSuccess);
warpperAfterActionEffect(ProfileActions.decreaseCartItemSuccess);
warpperAfterActionEffect(ProfileActions.clearCartItemSuccess);
