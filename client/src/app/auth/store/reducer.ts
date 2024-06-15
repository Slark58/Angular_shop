import { createFeature, createReducer, on } from '@ngrx/store';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';
import { IAuthState } from '../types/authState.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.action';
import { logoutAction } from './actions/logout.action';

export const AUTH_FEATURE_KEY = 'auth';

const initialState: IAuthState = {
  error: null,
  isAuth: false,
  isLoading: false,
  user: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    //$ REGISTER $//
    on(
      registerAction,
      (state): IAuthState => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      registerSuccessAction,
      (state, action): IAuthState => ({
        ...state,
        isLoading: false,
        user: action.user,
        isAuth: true,
      })
    ),
    on(
      registerFailureAction,
      (state, action): IAuthState => ({
        ...state,
        isLoading: true,
        error: action.error.message,
        isAuth: false,
      })
    ),

    //$ LOGIN $//

    on(
      loginAction,
      (state): IAuthState => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      loginSuccessAction,
      (state, action): IAuthState => ({
        ...state,
        isLoading: false,
        user: action.user,
        isAuth: true,
      })
    ),
    on(
      loginFailureAction,
      (state, action): IAuthState => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      })
    ),

    //$ CHECK AUTH $//

    // on(
    //   loginAction,
    //   (state): IAuthState => ({
    //     ...state,
    //     isLoading: true,
    //   })
    // ),
    // on(
    //   loginSuccessAction,
    //   (state, action): IAuthState => ({
    //     ...state,
    //     isLoading: false,
    //     user: action.user,
    //     isAuth: true,
    //   })
    // ),
    // on(
    //   loginFailureAction,
    //   (state, action): IAuthState => ({
    //     ...state,
    //     isLoading: false,
    //     error: action.error.message,
    //   })
    // ),

    //$ LOGOUT $//

    on(logoutAction, (state): IAuthState => {
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null,
      };
    })
  ),
});
