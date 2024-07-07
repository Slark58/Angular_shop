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
import { map } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule, RouterModule],
  templateUrl: './profile-cart.component.html',
  styleUrls: ['./profile-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCartComponent implements OnInit {
  private readonly profileFacade: ProfileFacade = inject(ProfileFacade);
  public activeAddress = signal<string>('');
  public addresses: string[] = arrAdreses;

  public basketId = this.profileFacade.basketId;
  public cartItems$ = this.profileFacade.cartItems$;
  public isCartItemsExist$ = this.cartItems$.pipe(
    map((products) => !products || products.length === 0)
  );
  public selectErrorCartItems$ = this.profileFacade.selectErrorCartItems$;
  public selectLoadingCartItems$ = this.profileFacade.selectLoadingCartItems$;

  public toggleAddress(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.activeAddress.set(value);
    console.log(this.activeAddress());
  }

  handleIncreaseCartItem(value: {
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
  handleDecreaseCartItem(value: {
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
  handleDeleteCartItem(value: {
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
  'Мск. ул.Владыкино, д11, к2',
  'Мск. ул.Бочково, д5',
  'Мск. ул.Угрешская, д1, к1',
  'Мск. ул.Матвеевксая, д38, к2',
  'Мск. Ленинский проспект, 4',
];
