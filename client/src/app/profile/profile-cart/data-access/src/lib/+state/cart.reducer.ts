import { createFeature, createReducer, on } from '@ngrx/store';
import { ICartState } from '../models/cartState.interface';
import { CartActions } from './cart.actions';

const initialState: ICartState = {
  cartItems: [],
  cartQuantity: 0,
  error: null,
  loading: false,
};

const reducer = createReducer(
  initialState,

  //* CART ITEMS *//
  on(CartActions.getCartItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(CartActions.getCartItemsSuccess, (state, action) => ({
    ...state,
    loading: false,
    cartItems: action.cartItems,
  })),
  on(CartActions.getCartItemsSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  //* INCREASE CART ITEM *//
  on(CartActions.increaseCartItem, (state) => ({
    ...state,
    loading: true,
  })),
  on(CartActions.increaseCartItemSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(CartActions.increaseCartItemFailure, (state) => ({
    ...state,
    loading: false,
  })),
  //* DECREASE CART ITEM *//
  on(CartActions.decreaseCartItem, (state) => ({
    ...state,
    loading: true,
  })),
  on(CartActions.decreaseCartItemSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(CartActions.decreaseCartItemFailure, (state) => ({
    ...state,
    loading: false,
  })),
  //* DELETE CART ITEM *//
  on(CartActions.deleteCartItem, (state) => ({
    ...state,
    loading: true,
  })),
  on(CartActions.deleteCartItemSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(CartActions.deleteCartItemFailure, (state) => ({
    ...state,
    loading: false,
  })),

  on(CartActions.reduceCartQuantity, (state) => ({
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

export const cartFeatere = createFeature({
  name: 'cart',
  reducer,
});
