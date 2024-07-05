import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TFullProduct } from '../../shared/types/fullProduct.type';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'get product by id': props<{ id: number }>(),
    'get product by id success': props<{ product: TFullProduct }>(),
    'get product by id failure': emptyProps(),
  },
});
