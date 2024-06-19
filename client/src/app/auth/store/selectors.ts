import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../types/authState.interface';
import { AUTH_FEATURE_KEY } from './reducer';

export const authFeatureSelector =
  createFeatureSelector<IAuthState>(AUTH_FEATURE_KEY);

export const isAuthSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isAuth
);
export const loadingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoading
);
export const errorSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.error
);
export const userSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.user
);
