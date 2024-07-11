import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICartItem } from '../models/cartItem.interface';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'get cart items': props<{ basketId: number }>(),
    'get cart items success': props<{ cartItems: ICartItem[] | undefined }>(),
    'get cart items failure': emptyProps(),

    'increase cart item': props<{
      productId: number;
      basketId: number;
      sizeId: number;
    }>(),
    'increase cart item success': emptyProps(),
    'increase cart item failure': emptyProps(),

    'decrease cart item': props<{
      productId: number;
      basketId: number;
      sizeId: number;
    }>(),
    'decrease cart item success': emptyProps(),
    'decrease cart item failure': emptyProps(),

    'clear cart item': emptyProps(),
    'clear cart item success': emptyProps(),
    'clear cart item failure': emptyProps(),

    'delete cart item': props<{
      productId: number;
      basketId: number;
      sizeId: number;
    }>(),
    'delete cart item success': emptyProps(),
    'delete cart item failure': emptyProps(),

    'reduce cart quantity': emptyProps(),
  },
});
