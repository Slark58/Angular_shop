import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IOrderItem } from '../models/orderItem.interface';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'create order': props<{
      userId: number | undefined;
      basketId: number;
      price: number;
      address: string;
    }>(),
    'create order success': emptyProps(),
    'create order failure': emptyProps(),

    'get orders': props<{ userId: number }>(),
    'get orders success': props<{ orderItems: IOrderItem[] | undefined }>(),
    'get orders failure': emptyProps(),

    'get order by id': emptyProps(),
    'get order by id success': emptyProps(),
    'get order by id failure': emptyProps(),
  },
});
