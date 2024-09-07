import { inject, Injectable } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Store } from '@ngrx/store';
import { ReviewsActions } from './reviews.actions';
import { Observable } from 'rxjs';
import { IReviewsData } from '../../types/IReviewsStore.interface';
import { selectData, selectIsLoading } from './reviews.selectors';
import { selectUserID } from '../../../auth/store/selectors';

@Injectable({ providedIn: 'root' })
export class ReviewsFacade {

  private readonly store: Store = inject(Store);
  public readonly data$: Observable<IReviewsData> = this.store.select(selectData);
  public userId$ = this.store.select(selectUserID)
  
  public createReview = (
    comment: string | undefined, 
    productId: number, 
    rating: number | null, 
    userId: number) => {
    this.store.dispatch(ReviewsActions.createReviews({comment, productId, rating, userId}));
  }

  public isLoading$ = this.store.select(selectIsLoading)
  getAllReviews(productId: number, userId: number) {
    this.store.dispatch(ReviewsActions.getReviews({productId, userId}))
  }
}
