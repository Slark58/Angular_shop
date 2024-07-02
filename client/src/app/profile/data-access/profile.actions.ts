import { createActionGroup, emptyProps } from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'profile',
  events: {
    'get cart items': emptyProps(),
    'get cart items success': emptyProps(),
    'get cart items failure': emptyProps(),

    'get orders': emptyProps(),
    'get orders success': emptyProps(),
    'get orders failure': emptyProps(),

    'get order by id': emptyProps(),
    'get order by id success': emptyProps(),
    'get order by id failure': emptyProps(),
  },
});
