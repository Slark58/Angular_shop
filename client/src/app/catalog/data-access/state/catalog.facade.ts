import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CatalogActions } from './catalog.actions';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { selectFilters, selectProducts } from './catalog.selectors';
import { Observable } from 'rxjs';
import { FullProduct } from '../../../models/Main';

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private readonly store: Store = inject(Store);

  public readonly filters$: Observable<IFiltersResponse[] | null> =
    this.store.select(selectFilters);
  public readonly products$: Observable<FullProduct[] | null> =
    this.store.select(selectProducts);

  getFilters() {
    this.store.dispatch(CatalogActions.getFilters());
  }
  getProducts() {
    this.store.dispatch(CatalogActions.getProducts());
  }
}
