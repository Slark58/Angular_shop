import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PersistService } from '../../../../../../shared/services/persist.service';
import { OrderActions } from './order.actions';
import { selectUserID, userSelector } from '../../../../../../auth/store/selectors';
import {
  selectError,
  selectLoading,
  selectOrderDetailed,
  selectOrderItems,
} from './order.selectors';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderFacade {
  private readonly store: Store = inject(Store);
  private readonly persistService: PersistService = inject(PersistService);

  // public basketId = this.persistService.get('basketId') as number;
  public selectOrderDetailed$ = this.store.select(selectOrderDetailed);
  public user$ = this.store.select(userSelector);
  public isLoadingOrderItems$ = this.store.select(selectLoading);
  public isErrorOrderItems$ = this.store.select(selectError);
  public userId$ = this.store.select(selectUserID);
  public orderItems$ = this.store.select(selectOrderItems);
 
  public createOrder(
    userId: number | undefined,
    basketId: number,
    price: number,
    address: string
  ) {
    this.store.dispatch(
      OrderActions.createOrder({ userId, basketId, price, address })
    );
  }

  public getOrderById(orderId: number) {
    this.store.dispatch(
      OrderActions.getOrderById({orderId})
    )
  }
  public createPayment(price: number) {
    this.store.dispatch(
      OrderActions.createPaymentOrder({price})
    )
  }

  public getOrdersById() {
    this.userId$.pipe(filter(Boolean)).subscribe((id) => {
      this.store.dispatch(OrderActions.getOrders({ userId: id }));
    });
  }
}
