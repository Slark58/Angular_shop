import { createAction, createActionGroup, props } from '@ngrx/store';
import { ActionTypes } from '../ActionTypes';
import { IRegisterRequest } from '../../types/registerReq.interface';
import { IUser } from '../../../shared/types/user.interface';
import { AuthResponse } from '../../types/authRes.interface';
import { IBackendError } from '../../../shared/types/backendError.interface';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: IRegisterRequest }>()
);
export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ user: IUser }>()
);
export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ error: IBackendError }>()
);

// export const registerAction = createActionGroup({
//   source: '[AUTH/API]',
//   events: {
//     'dsf': props<{}>(),
//   }
// })
