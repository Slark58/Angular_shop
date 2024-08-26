import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IReviews } from '../../types/IReviews.interface';
import { IReviewsData } from '../../types/IReviewsStore.interface';

export const ReviewsActions = createActionGroup({
  source: 'Reviews',
  events: {
    'get reviews': props<{productId: number, userId: number}>(),
    // 'get reviews success': emptyProps(),
    'get reviews success': props<{data: IReviewsData}>(),
    'get reviews failure': emptyProps(),

    'create reviews': emptyProps(),
    'create reviews success': emptyProps(),
    'create reviews failure': emptyProps(),

    'change reviews': emptyProps(),
    'change reviews success': emptyProps(),
    'change reviews failure': emptyProps(),
  },
});
