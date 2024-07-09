import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { ProfileFacade } from '../../data-access/profile.facade';
import { combineLatest, map, take, tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IUser } from '../../../shared/types/user.interface';

@Component({
  selector: 'app-profile-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile-cart.component.html',
  styleUrls: ['./profile-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCartComponent implements OnInit {
  private readonly profileFacade: ProfileFacade = inject(ProfileFacade);
  public activeAddress = signal<string>('');
  public addresses: string[] = arrAdreses;

  public basketId = this.profileFacade.basketId;
  public user$ = this.profileFacade.user$;
  public cartItems$ = this.profileFacade.cartItems$;
  public cartQuantity$ = this.profileFacade.selectCartQuantity$;
  public isLoadingCartItems$ = this.profileFacade.selectLoadingCartItems$;
  public selectErrorCartItems$ = this.profileFacade.selectErrorCartItems$;
  public selectLoadingCartItems$ = this.profileFacade.selectLoadingCartItems$;
  public isCartItemsExist$ = this.cartItems$.pipe(
    map((products) => !products || products.length === 0)
  );

  public toggleAddress(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.activeAddress.set(value);
    console.log(this.activeAddress());
  }

  public handleCreateOrder() {
    combineLatest([this.user$, this.cartQuantity$])
      .pipe(take(1))
      .subscribe({
        next: ([user, cartQiantity]: [IUser | null, number]) => {
          this.profileFacade.createOrder(
            user?.id,
            this.basketId,
            cartQiantity,
            this.activeAddress()
          );
        },
      });
  }

  public handleIncreaseCartItem(value: {
    productId: number;
    basketId: number;
    sizeId: number;
  }) {
    this.profileFacade.increaseCartItem(
      value.productId,
      value.basketId,
      value.sizeId
    );
  }
  public handleDecreaseCartItem(value: {
    productId: number;
    basketId: number;
    sizeId: number;
  }) {
    this.profileFacade.decreaseCartItem(
      value.productId,
      value.basketId,
      value.sizeId
    );
  }
  public handleDeleteCartItem(value: {
    productId: number;
    basketId: number;
    sizeId: number;
  }) {
    this.profileFacade.deleteCartItem(
      value.productId,
      value.basketId,
      value.sizeId
    );
  }

  ngOnInit() {
    console.log('this.basketId profile: ', this.basketId);

    this.profileFacade.getAllCartItems();
  }
}

const arrAdreses = [
  'Str. Roayn, 11',
  'Str. Novella, 20',
  'Str. Bobi Marshal, 2',
  'Str. Jenkins, 02',
  'Str. Chet, 4',
];
