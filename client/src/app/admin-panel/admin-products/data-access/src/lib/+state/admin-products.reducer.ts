import { createFeature, createReducer, on } from '@ngrx/store';
import { IAdminProductsState } from '../models/adminProductsState.interface';
import { AdminProductsActions } from './admin-products.actions';

const initialState: IAdminProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const adminProductFeature = createFeature({
  name: 'adminProducts',
  reducer: createReducer(
    initialState,

    on(AdminProductsActions.getProducts, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(AdminProductsActions.getProductsSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      products: actions.products,
    })),
    on(AdminProductsActions.getProductsFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(AdminProductsActions.createProduct, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(AdminProductsActions.createProductSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(AdminProductsActions.createProductFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});
