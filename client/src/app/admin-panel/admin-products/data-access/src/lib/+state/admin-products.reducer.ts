import { createFeature, createReducer, on } from '@ngrx/store';
import { IAdminProductsState } from '../models/adminProductsState.interface';
import { AdminProductsActions } from './admin-products.actions';
import { TFullProduct } from '../../../../../../shared/types/fullProduct.type';
import { CountAndRows } from '../../../../../../shared/types/countAndRows.interface';

const initialState: IAdminProductsState = {
  products: {} as CountAndRows<TFullProduct[]>,
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
