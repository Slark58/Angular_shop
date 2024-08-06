import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminProductsService } from './admin-products.service';
import { selectProducts } from './admin-products.selectors';
import { AdminProductsActions } from './admin-products.actions';

@Injectable({ providedIn: 'root' })
export class AdminProductsFacade {
  private readonly store: Store = inject(Store);
  private readonly adminService: AdminProductsService =
    inject(AdminProductsService);
  public products$ = this.store.select(selectProducts);

  getProducts() {
    this.store.dispatch(AdminProductsActions.getProducts());
  }
  getUsers() {}
  getFilters() {
    return this.adminService.getFilters();
  }
  createProduct(product: FormData) {
    this.store.dispatch(AdminProductsActions.createProduct({ product }));
  }
}
