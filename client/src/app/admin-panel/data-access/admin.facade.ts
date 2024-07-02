import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts } from './admin.selectors';
import { AdminService } from './admin.service';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
  private readonly store: Store = inject(Store);
  private readonly adminService: AdminService = inject(AdminService);
  public products$ = this.store.select(selectProducts);

  getProducts() {}
  getUsers() {}
  getFilters() {
    return this.adminService.getFilters();
  }
  createProducts() {}
}
