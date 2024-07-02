import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  errorSelector,
  loadingSelector,
  userSelector,
} from '../../auth/store/selectors';

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  private readonly store: Store = inject(Store);

  public user$ = this.store.select(userSelector);
  public isLoadingUser$ = this.store.select(loadingSelector);
  public errorUser$ = this.store.select(errorSelector);
}
