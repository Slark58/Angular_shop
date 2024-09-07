import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IReview } from '../../types/IReviews.interface';
import { IReviewsData } from '../../types/IReviewsStore.interface';

export const ReviewsActions = createActionGroup({
  source: 'Reviews',
  events: {
    'get reviews': props<{productId: number, userId: number}>(),
    // 'get reviews success': emptyProps(),
    'get reviews success': props<{data: IReviewsData}>(),
    'get reviews failure': emptyProps(),

    'create reviews': props<{
      productId: number,
      userId: number,
      comment: string | undefined,
      rating: number | null,
    }>(),
    'create reviews success': props<{review: IReview}>(),
    'create reviews failure': props<{error: string}>(),

    'change reviews': emptyProps(),
    'change reviews success': emptyProps(),
    'change reviews failure': emptyProps(),
  },
});
