import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CatalogActions } from './catalog.actions';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { selectFilters, selectProducts } from './catalog.selectors';
import { Observable } from 'rxjs';
import { TFullProduct } from '../../../shared/types/fullProduct.type';

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private readonly store: Store = inject(Store);

  public readonly filters$: Observable<IFiltersResponse[] | null> =
    this.store.select(selectFilters);
  public readonly products$: Observable<TFullProduct[] | null> =
    this.store.select(selectProducts);

  getFilters() {
    this.store.dispatch(CatalogActions.getFilters());
  }
  getProducts(filters: Record<string, number[]> | null) {
    this.store.dispatch(CatalogActions.getProducts({ filters }));
  }
}
