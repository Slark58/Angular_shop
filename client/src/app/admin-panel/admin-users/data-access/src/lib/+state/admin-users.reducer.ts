import { createFeature, createReducer, on } from '@ngrx/store';
import { IAdminUsersState } from '../models/adminUsersState.interface';
import { AdminUsersActions } from './admin-users.actions';

const initialState: IAdminUsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const adminUsersFeature = createFeature({
  name: 'adminUsers',
  reducer: createReducer(
    initialState,

    on(AdminUsersActions.getUsers, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(AdminUsersActions.getUsersSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      users: actions.users,
    })),
    on(AdminUsersActions.getUsersFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});
