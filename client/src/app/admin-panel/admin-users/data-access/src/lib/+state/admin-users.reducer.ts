import { createFeature, createReducer, on } from '@ngrx/store';
import { IAdminUsersState } from '../models/adminUsersState.interface';
import { AdminUsersActions } from './admin-users.actions';
import { CountAndRows } from '../../../../../../shared/types/countAndRows.interface';
import { IUser } from '../../../../../../shared/types/user.interface';

const initialState: IAdminUsersState = {
  users: {} as CountAndRows<IUser[]>,
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
