import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { OrderActions } from './order.actions';
import { OrderService } from './order.service';

export const createOrderById = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.createOrder),
      switchMap(({ userId, basketId, price, address }) => {
        return orderService.createOrder(userId, basketId, price, address).pipe(
          map(() => OrderActions.createOrderSuccess()),
          catchError(() => of(OrderActions.createOrderFailure()))
        );
      })
    );
  },
  { functional: true }
);
export const getAllOrderItemsById = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(OrderActions.getOrders),
      switchMap(({ userId }) => {
        return orderService.getAllOrdersById(userId).pipe(
          map((orderItems) => OrderActions.getOrdersSuccess({ orderItems })),
          catchError(() => of(OrderActions.getOrdersFailure()))
        );
      })
    );
  },
  { functional: true }
);
