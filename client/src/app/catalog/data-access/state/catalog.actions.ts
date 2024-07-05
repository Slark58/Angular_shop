import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { TFullProduct } from '../../../shared/types/fullProduct.type';

export const CatalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Get products': emptyProps(),
    'Get products success': props<{ products: TFullProduct[] }>(),
    'Get products failure': emptyProps(),
    'Get filters': emptyProps(),
    'Get filters success': props<{ filters: IFiltersResponse[] }>(),
    'Get filters failure': emptyProps(),
  },
});
