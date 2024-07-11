import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { combineLatest, map, take } from 'rxjs';
import { IUser } from '../../../../../shared/types/user.interface';
import { CartFacade } from '../../../data-access/src';

@Component({
  selector: 'app-cart-container',
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartContainerComponent implements OnInit {
  private readonly cartFacade = inject(CartFacade);
  public activeAddress = signal<string>('');
  public addresses: string[] = arrAdreses;

  public basketId = this.cartFacade.basketId;
  public cartItems$ = this.cartFacade.cartItems$;
  public cartQuantity$ = this.cartFacade.selectCartQuantity$;
  public isLoadingCartItems$ = this.cartFacade.selectLoadingCartItems$;
  public selectErrorCartItems$ = this.cartFacade.selectErrorCartItems$;
  public selectLoadingCartItems$ = this.cartFacade.selectLoadingCartItems$;
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
          this.cartFacade.createOrder(
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
    this.cartFacade.increaseCartItem(
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
    this.cartFacade.decreaseCartItem(
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
    this.cartFacade.deleteCartItem(
      value.productId,
      value.basketId,
      value.sizeId
    );
  }

  ngOnInit() {
    console.log('this.basketId profile: ', this.basketId);

    this.cartFacade.getAllCartItems();
  }
}
const arrAdreses = [
  'Str. Roayn, 11',
  'Str. Novella, 20',
  'Str. Bobi Marshal, 2',
  'Str. Jenkins, 02',
  'Str. Chet, 4',
];
