import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../ActionTypes';
import { ILoginRequest } from '../../types/loginReq.interface';
import { IUser } from '../../../shared/types/User.interface';
import { IBackendError } from '../../../shared/types/backendError.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: ILoginRequest }>()
);
export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ user: IUser }>()
);
export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ error: IBackendError }>()
);
