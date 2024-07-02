import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FullProduct } from '../../models/Main';
import { IUser } from '../../shared/types/user.interface';
import { CreateProductInterface } from '../types/createProduct.interface';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'get products': emptyProps(),
    'get products success': props<{ products: FullProduct[] }>(),
    'get products failure': emptyProps(),

    'create products': props<{ product: CreateProductInterface }>(),
    'create products success': emptyProps(),
    'create products failure': emptyProps(),

    'get users': emptyProps(),
    'get users success': props<{ users: IUser[] }>(),
    'get users failure': emptyProps(),

    'get orders': emptyProps(),
    'get orders success': emptyProps(),
    'get orders failure': emptyProps(),
  },
});
