import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Observable } from 'rxjs';
import { selectProduct } from './product.selectors';
import { TFullProduct } from '../../shared/types/fullProduct.type';
import { CartActions } from '../../profile/profile-cart/data-access/src';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly store: Store = inject(Store);

  public readonly product$: Observable<TFullProduct | null> =
    this.store.select(selectProduct);

  increaseCartItemById(productId: number, basketId: number, sizeId: number) {
    console.log('productId: ', productId, 'basketId: ', basketId);

    this.store.dispatch(
      CartActions.increaseCartItem({ productId, basketId, sizeId })
    );
  }

  getProductById(id: number) {
    this.store.dispatch(ProductActions.getProductById({ id }));
  }
}
