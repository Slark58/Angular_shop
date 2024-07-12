import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PersistService } from '../../../../../../shared/services/persist.service';
import {
  selectCartItems,
  selectCartQuantity,
  selectError,
  selectLoading,
} from './cart.selectors';
import { CartActions } from './cart.actions';
import {
  selectUserID,
  userSelector,
} from '../../../../../../auth/store/selectors';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly store: Store = inject(Store);
  private readonly persistService: PersistService = inject(PersistService);
  public basketId = this.persistService.get('basketId') as number;

  public userId$ = this.store.select(selectUserID);
  public cartItems$ = this.store.select(selectCartItems);
  public selectCartQuantity$ = this.store.select(selectCartQuantity);
  public selectLoadingCartItems$ = this.store.select(selectLoading);
  public selectErrorCartItems$ = this.store.select(selectError);

  public getAllCartItems() {
    console.log('basketId: ', this.basketId, 'typeof: ', typeof this.basketId);

    this.store.dispatch(CartActions.getCartItems({ basketId: this.basketId }));
  }

  public increaseCartItem(productId: number, basketId: number, sizeId: number) {
    this.store.dispatch(
      CartActions.increaseCartItem({
        productId,
        basketId,
        sizeId,
      })
    );
  }
  public decreaseCartItem(productId: number, basketId: number, sizeId: number) {
    this.store.dispatch(
      CartActions.decreaseCartItem({
        productId,
        basketId,
        sizeId,
      })
    );
  }
  public deleteCartItem(productId: number, basketId: number, sizeId: number) {
    this.store.dispatch(
      CartActions.deleteCartItem({
        productId,
        basketId,
        sizeId,
      })
    );
  }
}
