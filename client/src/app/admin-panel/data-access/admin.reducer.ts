import { createFeature, createReducer, on } from '@ngrx/store';
import { IAdmintStore } from '../types/adminStore.interface';
import { createEntityAdapter } from '@ngrx/entity';
import { FullProduct } from '../../models/Main';
import { IUser } from '../../shared/types/user.interface';
import { AdminActions } from './admin.actions';

const initialState: IAdmintStore = {
  error: null,
  isLoading: false,
  // orders: [],
  products: [],
  users: [],
};

const reducer = createReducer(
  initialState,

  //$ PRODUCTS $//

  on(AdminActions.getProducts, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AdminActions.getProductsSuccess, (state, actions) => ({
    ...state,
    isLoading: false,
    products: actions.products,
  })),
  on(AdminActions.getProductsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(AdminActions.createProducts, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(AdminActions.createProductsSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(AdminActions.createProductsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),

  //$ USERS $//

  on(AdminActions.getUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AdminActions.getUsersSuccess, (state, actions) => ({
    ...state,
    isLoading: false,
    users: actions.users,
  })),
  on(AdminActions.getUsersFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const adminFeature = createFeature({
  name: 'admin',
  reducer,
});