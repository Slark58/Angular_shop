import { createActionGroup, emptyProps } from '@ngrx/store';

export const AdminOrdersActions = createActionGroup({
  source: 'Admin Orders',
  events: {
    'get orders': emptyProps(),
    'get orders success': emptyProps(),
    'get orders failure': emptyProps(),
  },
});
