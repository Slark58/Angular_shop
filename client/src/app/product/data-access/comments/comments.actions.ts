import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CommentsActions = createActionGroup({
  source: 'Comments',
  events: {
    'get comments': emptyProps(),
    'get comments success': emptyProps(),
    'get comments failure': emptyProps(),

    'create comment': emptyProps(),
    'create comment success': emptyProps(),
    'create comment failure': emptyProps(),

    'change comment': emptyProps(),
    'change comment success': emptyProps(),
    'change comment failure': emptyProps(),
  },
});
