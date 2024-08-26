import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReviewsService } from "./reviews.service";
import { ReviewsActions } from "./reviews.actions";
import { catchError, map, of, switchMap } from "rxjs";



export const getReviewsEffect = createEffect(
  (actions$ = inject(Actions), reviewsService = inject(ReviewsService)) => {
    return actions$.pipe(
      ofType(ReviewsActions.getReviews),
      switchMap(({productId, userId}) => {
        return reviewsService.getReviews(productId, userId).pipe(
          map((data) => ReviewsActions.getReviewsSuccess({data})),
          catchError(() => of(ReviewsActions.getReviewsFailure()))
        );
      })
    )
  },
  {functional: true}
)