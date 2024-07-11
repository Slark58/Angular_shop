import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { PersistService } from '../../../../../../shared/services/persist.service';
import { CartActions } from './cart.actions';
import { CartService } from './cart.service';

export const getAllCartItemsEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(CartActions.getCartItems),
      switchMap(({ basketId }) => {
        console.log('getAllCartItemsEffect basketId: ', basketId);

        return cartService.getAllCartItems(basketId).pipe(
          map((cartItems) => CartActions.getCartItemsSuccess({ cartItems })),
          catchError(() => of(CartActions.getCartItemsFailure()))
        );
      })
    );
  },
  { functional: true }
);

export const increaseCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(CartActions.increaseCartItem),
      switchMap(({ basketId, productId, sizeId }) => {
        return cartService.incrementProduct(productId, basketId, sizeId).pipe(
          map(() => CartActions.increaseCartItemSuccess()),
          catchError(() => of(CartActions.increaseCartItemFailure()))
        );
      })
    );
  },
  { functional: true }
);
export const decreaseCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(CartActions.decreaseCartItem),
      switchMap(({ basketId, productId, sizeId }) => {
        return cartService.decrementProduct(productId, basketId, sizeId).pipe(
          map(() => CartActions.decreaseCartItemSuccess()),
          catchError(() => of(CartActions.decreaseCartItemFailure()))
        );
      })
    );
  },
  { functional: true }
);

export const deleteCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(CartActions.deleteCartItem),
      switchMap(({ basketId, productId, sizeId }) => {
        return cartService.deleteProduct(productId, basketId, sizeId).pipe(
          map(() => CartActions.deleteCartItemSuccess()),
          catchError(() => of(CartActions.deleteCartItemFailure()))
        );
      })
    );
  },
  { functional: true }
);

export const reduceQuantityEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(CartActions.getCartItemsSuccess),
      map(() => CartActions.reduceCartQuantity())
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
            return CartActions.getCartItemsFailure();
          }
          console.log('basketId after check: ', basketId);
          return CartActions.getCartItems({
            basketId: basketId as number,
          });
        }),
        catchError(() => of(CartActions.clearCartItemFailure))
      );
    },
    { functional: true }
  );
};

export const getCartItemsAfterSuccessInc = warpperAfterActionEffect(
  CartActions.increaseCartItemSuccess
);
export const getCartItemsAfterSuccessВус = warpperAfterActionEffect(
  CartActions.decreaseCartItemSuccess
);
export const getCartItemsAfterSuccessDel = warpperAfterActionEffect(
  CartActions.deleteCartItemSuccess
);
