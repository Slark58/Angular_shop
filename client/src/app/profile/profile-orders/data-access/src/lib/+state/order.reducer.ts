import { createFeature, createReducer, on } from '@ngrx/store';
import { IOrderState } from '../models/orderState.interface';
import { OrderActions } from './order.actions';
import { IOrderItem } from '../models/orderItem.interface';

const initialState: IOrderState = {
  orderItems: [],
  orderDetailed: {} as IOrderItem,
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
      loading: false,
      orderItems: action.orderItems,
    })),
    on(OrderActions.getOrdersFailure, (state) => ({
      ...state,
      loading: false,
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

    //* ORDER BY ID *//
    on(OrderActions.getOrderById, (state) => ({
      ...state,
      loading: true,
    })),
    on(OrderActions.getOrderByIdSuccess, (state, action) => ({
      ...state,
      loading: false,
      orderDetailed: action.order
    })),
    on(OrderActions.getOrderByIdFailure, (state) => ({
      ...state,
      loading: false,
    })),


    //* CREATE PAYMENT ORDER *//
    on(OrderActions.createPaymentOrder, (state) => ({
      ...state,
      loading: true,
    })),
    on(OrderActions.createPaymentOrderSuccess, (state, action) => ({
      ...state,
      loading: false,
    })),
    on(OrderActions.createPaymentOrderFailure, (state) => ({
      ...state,
      loading: false,
    }))
  ),
});
