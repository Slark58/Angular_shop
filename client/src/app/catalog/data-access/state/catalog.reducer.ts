import { createFeature, createReducer, on } from '@ngrx/store';
import { ICatolgState } from '../../types/ICatolgState.interface';
import { CatalogActions } from './catalog.actions';

export const initState: ICatolgState = {
  products: [],
  filters: [],
  error: null,
  isLoading: false,
};

const reducer = createReducer(
  initState,

  //@ PRODUCTS @//

  on(CatalogActions.getProducts, (state) => ({ ...state, isLoading: true })),
  on(CatalogActions.getProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    isLoading: false,
  })),
  on(CatalogActions.getProductsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),

  //@ FILTERS @//

  on(CatalogActions.getFilters, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CatalogActions.getFiltersSuccess, (state, action) => ({
    ...state,
    filters: action.filters,
    isLoading: false,
  })),
  on(CatalogActions.getFiltersFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const catalogFeature = createFeature({
  name: 'catalog',
  reducer,
});
