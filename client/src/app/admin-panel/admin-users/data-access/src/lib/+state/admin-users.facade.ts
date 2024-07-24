import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminUsersActions } from './admin-users.actions';

@Injectable({ providedIn: 'root' })
export class AdminUsersFacade {
  private readonly store: Store = inject(Store);

  public getAllUsers() {
    this.store.dispatch(AdminUsersActions.getUsers());
  }
}
