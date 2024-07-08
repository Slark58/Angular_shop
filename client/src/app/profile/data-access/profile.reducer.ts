import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileState } from '../types/profileState.interface';
import { ProfileActions } from './profile.actions';

const initialState: ProfileState = {
  cartItems: [],
  cartQuantity: 0,
  error: null,
  loading: false,
};

const reducer = createReducer(
  initialState,

  //* CART ITEMS *//
  on(ProfileActions.getCartItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.getCartItemsSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: action.cartItems,
  })),
  on(ProfileActions.getCartItemsSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  //* INCREASE CART ITEM *//
  on(ProfileActions.increaseCartItem, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.increaseCartItemSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ProfileActions.increaseCartItemFailure, (state) => ({
    ...state,
    loading: false,
  })),

  //* ORDERS *//
  on(ProfileActions.getOrders, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.getOrdersSuccess, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.getOrdersFailure, (state) => ({
    ...state,
    loading: true,
  })),

  //* ORDERS BY ID *//
  on(ProfileActions.getOrderById, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.getOrderByIdSuccess, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.getOrderByIdFailure, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProfileActions.reduceCartQuantity, (state) => ({
    ...state,
    cartQuantity: state.cartItems
      ? state.cartItems.reduce((acc, item) => {
          if (item) {
            return acc + (item.product_char.product.price ?? 0) * item.quantity;
          } else {
            return acc;
          }
        }, 0)
      : 0,
  }))
);

export const profileFeatere = createFeature({
  name: 'profile',
  reducer,
});
