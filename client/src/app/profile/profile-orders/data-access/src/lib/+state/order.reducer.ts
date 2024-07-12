import { createFeature, createReducer, on } from '@ngrx/store';
import { IOrderState } from '../models/orderState.interface';
import { OrderActions } from './order.actions';

const initialState: IOrderState = {
  orderItems: [],
  error: null,
  loading: false,
};

export const orderFeature = createFeature({
  name: 'order',
  reducer: createReducer(
    initialState,

    //* ORDERS *//
    on(OrderActions.getOrders, (state) => ({
      ...state,
      loading: true,
    })),
    on(OrderActions.getOrdersSuccess, (state, action) => ({
      ...state,
      loading: true,
      orderItems: action.orderItems,
    })),
    on(OrderActions.getOrdersFailure, (state) => ({
      ...state,
      loading: true,
    })),
    //* CREATE ORDER BY ID *//
    on(OrderActions.createOrder, (state) => ({
      ...state,
      loading: true,
    })),
    on(OrderActions.createOrderSuccess, (state, action) => ({
      ...state,
      loading: false,
    })),
    on(OrderActions.createOrderFailure, (state) => ({
      ...state,
      loading: false,
    })),

    //* ORDERS BY ID *//
    on(OrderActions.getOrderById, (state) => ({
      ...state,
      loading: true,
    })),
    on(OrderActions.getOrderByIdSuccess, (state) => ({
      ...state,
      loading: true,
    })),
    on(OrderActions.getOrderByIdFailure, (state) => ({
      ...state,
      loading: true,
    }))
  ),
});
