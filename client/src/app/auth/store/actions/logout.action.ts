import { createAction } from '@ngrx/store';
import { ActionTypes } from '../ActionTypes';

export const logoutAction = createAction(ActionTypes.LOGOUT_ACTION);
