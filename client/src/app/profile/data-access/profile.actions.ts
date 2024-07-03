import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICartItem } from '../types/cartItem.interface';

export const ProfileActions = createActionGroup({
  source: 'profile',
  events: {
    'get cart items': props<{ basketId: number }>(),
    'get cart items success': props<{ cartItems: ICartItem[] | undefined }>(),
    'get cart items failure': emptyProps(),

    'get orders': emptyProps(),
    'get orders success': emptyProps(),
    'get orders failure': emptyProps(),

    'get order by id': emptyProps(),
    'get order by id success': emptyProps(),
    'get order by id failure': emptyProps(),
  },
});
