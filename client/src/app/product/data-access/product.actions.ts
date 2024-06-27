import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FullProduct } from '../../models/Main';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'get product by id ': props<{ id: number }>(),
    'get product by id success': props<{ product: FullProduct }>(),
    'get product by id failure': emptyProps(),
  },
});
