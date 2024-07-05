import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../shared/types/user.interface';
import { CreateProductInterface } from '../types/createProduct.interface';
import { TFullProduct } from '../../shared/types/fullProduct.type';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'get products': emptyProps(),
    'get products success': props<{ products: TFullProduct[] }>(),
    'get products failure': emptyProps(),

    'create product': props<{ product: FormData }>(),
    'create product success': emptyProps(),
    'create product failure': emptyProps(),

    'get users': emptyProps(),
    'get users success': props<{ users: IUser[] }>(),
    'get users failure': emptyProps(),

    'get orders': emptyProps(),
    'get orders success': emptyProps(),
    'get orders failure': emptyProps(),
  },
});
