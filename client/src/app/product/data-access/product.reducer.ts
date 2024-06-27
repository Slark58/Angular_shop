import { createFeature, createReducer, on } from '@ngrx/store';
import { IProductStore } from '../types/IProductStore.interface';
import { ProductActions } from './product.actions';

const initialState: IProductStore = {
  product: null,
  error: null,
  isLoading: false,
};

const reducer = createReducer(
  initialState,
  on(ProductActions.getProductById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductActions.getProductByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    product: action.product,
  })),
  on(ProductActions.getProductByIdFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const productFeature = createFeature({
  name: 'product',
  reducer,
});
