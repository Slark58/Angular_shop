import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ICartItem } from '../../../data-access/src';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  @Input('cartItem') cartItemProps!: ICartItem;
  @Input('basketId') basketIdProps!: number;
  @Input('isLoading$') isLoadingProps$!: Observable<boolean>;

  @Output() evantIncreaseCartItem = new EventEmitter<{
    productId: number;
    basketId: number;
    sizeId: number;
  }>();
  @Output() evantDecreaseCartItem = new EventEmitter<{
    productId: number;
    basketId: number;
    sizeId: number;
  }>();
  @Output() evantDeleteCartItem = new EventEmitter<{
    productId: number;
    basketId: number;
    sizeId: number;
  }>();

  handleIncreaseCartItem(productId: number, basketId: number, sizeId: number) {
    console.log(
      'INCREASE::::',
      'productId: ',
      productId,
      'basketId: ',
      basketId,
      'sizeId: ',
      sizeId
    );

    this.evantIncreaseCartItem.emit({ productId, basketId, sizeId });
  }
  handleDecreaseCartItem(productId: number, basketId: number, sizeId: number) {
    console.log(
      'DECREASE::::',
      'productId: ',
      productId,
      'basketId: ',
      basketId,
      'sizeId: ',
      sizeId
    );

    this.evantDecreaseCartItem.emit({ productId, basketId, sizeId });
  }
  handleDeleteCartItem(productId: number, basketId: number, sizeId: number) {
    console.log(
      'DELETE::::',
      'productId: ',
      productId,
      'basketId: ',
      basketId,
      'sizeId: ',
      sizeId
    );

    this.evantDeleteCartItem.emit({ productId, basketId, sizeId });
  }

  ngOnInit() {
    console.log('cartItemProps: ', this.cartItemProps?.product_char.size.id);

    console.log('basketIdProps: ', this.basketIdProps);
  }
}
