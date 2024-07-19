import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TFullProduct } from '../../../../../../shared/types/fullProduct.type';

export const AdminProductsActions = createActionGroup({
  source: 'Admin Products',
  events: {
    'get products': emptyProps(),
    'get products success': props<{ products: TFullProduct[] }>(),
    'get products failure': emptyProps(),

    'create product': props<{ product: FormData }>(),
    'create product success': emptyProps(),
    'create product failure': emptyProps(),
  },
});
