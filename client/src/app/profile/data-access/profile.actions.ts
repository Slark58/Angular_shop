import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICartItem } from '../types/cartItem.interface';

export const ProfileActions = createActionGroup({
  source: 'profile',
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

    'get orders': emptyProps(),
    'get orders success': emptyProps(),
    'get orders failure': emptyProps(),

    'get order by id': emptyProps(),
    'get order by id success': emptyProps(),
    'get order by id failure': emptyProps(),

    'reduce cart quantity': emptyProps(),
  },
});
