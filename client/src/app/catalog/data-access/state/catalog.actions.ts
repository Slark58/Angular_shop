import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FullProduct } from '../../../models/Main';
import { IFiltersResponse } from '../../types/filterResponse.interface';

export const CatalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Get products': emptyProps(),
    'Get products success': props<{ products: FullProduct[] }>(),
    'Get products failure': emptyProps(),
    'Get filters': emptyProps(),
    'Get filters success': props<{ filters: IFiltersResponse[] }>(),
    'Get filters failure': emptyProps(),
  },
});
