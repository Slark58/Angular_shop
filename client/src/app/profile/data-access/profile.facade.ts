import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  errorSelector,
  loadingSelector,
  userSelector,
} from '../../auth/store/selectors';
import { ProfileService } from './profile.service';
import { PersistService } from '../../shared/services/persist.service';
import { ProfileActions } from './profile.actions';
import {
  selectCartItems,
  selectCartQuantity,
  selectError,
  selectLoading,
} from './profile.selectors';

@Injectable({ providedIn: 'root' })
export class ProfileFacade {
  private readonly store: Store = inject(Store);
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly persistService: PersistService = inject(PersistService);

  public cartItems$ = this.store.select(selectCartItems);
  public selectCartQuantity$ = this.store.select(selectCartQuantity);
  public selectLoadingCartItems$ = this.store.select(selectLoading);
  public selectErrorCartItems$ = this.store.select(selectError);

  public user$ = this.store.select(userSelector);
  public isLoadingUser$ = this.store.select(loadingSelector);
  public errorUser$ = this.store.select(errorSelector);

  public basketId = this.persistService.get('basketId') as number;

  public getAllCartItems() {
    console.log('basketId: ', this.basketId, 'typeof: ', typeof this.basketId);

    this.store.dispatch(
      ProfileActions.getCartItems({ basketId: this.basketId })
    );
  }

  public increaseCartItem(productId: number, basketId: number, sizeId: number) {
    this.store.dispatch(
      ProfileActions.increaseCartItem({
        productId,
        basketId,
        sizeId,
      })
    );
  }
}
