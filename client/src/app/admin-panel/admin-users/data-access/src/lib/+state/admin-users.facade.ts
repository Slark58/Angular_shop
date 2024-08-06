import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminUsersActions } from './admin-users.actions';
import { selectUsers } from './admin-users.selectors';

@Injectable({ providedIn: 'root' })
export class AdminUsersFacade {
  private readonly store: Store = inject(Store);

  public users$ = this.store.select(selectUsers);
  public getAllUsers() {
    this.store.dispatch(AdminUsersActions.getUsers());
  }
}
