import { createFeature, createReducer } from '@ngrx/store';
import { IAdminOrdersState } from '../models/adminOrdersState.interface';

const initialState: IAdminOrdersState = {
  orders: null,
  error: null,
  isLoading: false,
};

export const adminOrdersFeature = createFeature({
  name: 'adminOrders',
  reducer: createReducer(initialState),
});
