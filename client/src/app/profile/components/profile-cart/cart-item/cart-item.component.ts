import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ICartItem } from '../../../types/cartItem.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  @Input('cartItem') cartItemProps!: ICartItem;
  @Input('basketId') basketIdProps!: number;

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
  @Output() evantClearCartItem = new EventEmitter<{
    productId: number;
    basketId: number;
    sizeId: number;
  }>();

  handleIncreaseCartItem(productId: number, basketId: number, sizeId: number) {
    this.evantIncreaseCartItem.emit({ productId, basketId, sizeId });
  }
  handleDecreaseCartItem(productId: number, basketId: number, sizeId: number) {
    this.evantDecreaseCartItem.emit({ productId, basketId, sizeId });
  }
  handleClearCartItem(productId: number, basketId: number, sizeId: number) {
    this.evantClearCartItem.emit({ productId, basketId, sizeId });
  }

  ngOnInit() {}
}
