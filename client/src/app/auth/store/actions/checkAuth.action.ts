import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../ActionTypes';
import { IUser } from '../../../shared/types/user.interface';

export const checkAuthAction = createAction(ActionTypes.CHECK_AUTH);
export const checkAuthSuccessAction = createAction(
  ActionTypes.CHECK_AUTH_SUCCESS,
  props<{ user: IUser }>()
);
export const checkAuthFailureAction = createAction(
  ActionTypes.CHECK_AUTH_FAILURE
);
