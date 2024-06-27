import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Observable } from 'rxjs';
import { FullProduct } from '../../models/Main';
import { selectProduct } from './product.selectors';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly store: Store = inject(Store);

  public readonly product$: Observable<FullProduct | null> =
    this.store.select(selectProduct);

  getProductById(id: number) {
    this.store.dispatch(ProductActions.getProductById({ id }));
  }
}
