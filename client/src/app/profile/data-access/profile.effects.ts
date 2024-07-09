import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from './profile.service';
import { ProfileActions } from './profile.actions';
import { EMPTY, catchError, map, of, switchMap, tap } from 'rxjs';
import { PersistService } from '../../shared/services/persist.service';
import { ActionCreator } from '@ngrx/store';

export const getAllCartItemsEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.getCartItems),
      switchMap(({ basketId }) => {
        console.log('getAllCartItemsEffect basketId: ', basketId);

        return profileService.getAllCartItems(basketId).pipe(
          map((cartItems) => ProfileActions.getCartItemsSuccess({ cartItems })),
          catchError(() => of(ProfileActions.getCartItemsFailure()))
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
            catchError(() => of(ProfileActions.increaseCartItemFailure()))
          );
      })
    );
  },
  { functional: true }
);
export const decreaseCartItemEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.decreaseCartItem),
      switchMap(({ basketId, productId, sizeId }) => {
        return profileService
          .decrementProduct(productId, basketId, sizeId)
          .pipe(
            map(() => ProfileActions.decreaseCartItemSuccess()),
            catchError(() => of(ProfileActions.decreaseCartItemFailure()))
          );
      })
    );
  },
  { functional: true }
);

export const deleteCartItemEffect = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.deleteCartItem),
      switchMap(({ basketId, productId, sizeId }) => {
        return profileService.deleteProduct(productId, basketId, sizeId).pipe(
          map(() => ProfileActions.deleteCartItemSuccess()),
          catchError(() => of(ProfileActions.deleteCartItemFailure()))
        );
      })
    );
  },
  { functional: true }
);
export const createOrderById = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.createOrder),
      switchMap(({ userId, basketId, price, address }) => {
        return profileService
          .createOrder(userId, basketId, price, address)
          .pipe(
            map(() => ProfileActions.createOrderSuccess()),
            catchError(() => of(ProfileActions.createOrderFailure()))
          );
      })
    );
  },
  { functional: true }
);
export const getAllOrderItemsById = createEffect(
  (actions$ = inject(Actions), profileService = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(ProfileActions.getOrders),
      switchMap(({ userId }) => {
        return profileService.getAllOrdersById(userId).pipe(
          map((orderItems) => ProfileActions.getOrdersSuccess({ orderItems })),
          catchError(() => of(ProfileActions.getOrdersFailure()))
        );
      })
    );
  },
  { functional: true }
);

export const reduceQuantityEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ProfileActions.getCartItemsSuccess),
      map(() => ProfileActions.reduceCartQuantity())
    );
  },
  { functional: true }
);

const warpperAfterActionEffect = (action: string | ActionCreator) => {
  return createEffect(
    (actions$ = inject(Actions), persistService = inject(PersistService)) => {
      return actions$.pipe(
        ofType(action),
        map(() => {
          const basketId = persistService.get('basketId');
          if (!basketId) {
            return ProfileActions.getCartItemsFailure();
          }
          console.log('basketId after check: ', basketId);
          return ProfileActions.getCartItems({
            basketId: basketId as number,
          });
        }),
        catchError(() => of(ProfileActions.clearCartItemFailure))
      );
    },
    { functional: true }
  );
};

export const getCartItemsAfterSuccessInc = warpperAfterActionEffect(
  ProfileActions.increaseCartItemSuccess
);
export const getCartItemsAfterSuccessВус = warpperAfterActionEffect(
  ProfileActions.decreaseCartItemSuccess
);
export const getCartItemsAfterSuccessDel = warpperAfterActionEffect(
  ProfileActions.deleteCartItemSuccess
);
