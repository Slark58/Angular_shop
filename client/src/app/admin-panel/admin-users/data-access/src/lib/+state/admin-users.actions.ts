import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../../../../../shared/types/user.interface';
import { CountAndRows } from '../../../../../../shared/types/countAndRows.interface';

export const AdminUsersActions = createActionGroup({
  source: 'Admin Users',
  events: {
    'get users': emptyProps(),
    'get users success': props<{ users: CountAndRows<IUser[]> }>(),
    'get users failure': emptyProps(),
  },
});
