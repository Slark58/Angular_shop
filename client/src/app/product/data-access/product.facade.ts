import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Observable } from 'rxjs';
import { selectProduct } from './product.selectors';
import { ProfileActions } from '../../profile/data-access/profile.actions';
import { TFullProduct } from '../../shared/types/fullProduct.type';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly store: Store = inject(Store);

  public readonly product$: Observable<TFullProduct | null> =
    this.store.select(selectProduct);

  increaseCartItemById(productId: number | null, basketId: string | null) {
    console.log('productId: ', productId, 'basketId: ', basketId);

    this.store.dispatch(
      ProfileActions.increaseCartItem({ productId, basketId })
    );
  }

  getProductById(id: number) {
    this.store.dispatch(ProductActions.getProductById({ id }));
  }
}
