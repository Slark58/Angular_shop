import { inject, Injectable } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Store } from '@ngrx/store';
import { ReviewsActions } from './reviews.actions';
import { Observable } from 'rxjs';
import { IReviewsData } from '../../types/IReviewsStore.interface';
import { selectData } from './reviews.selectors';

@Injectable({ providedIn: 'root' })
export class ReviewsFacade {

  private readonly store: Store = inject(Store);
  public readonly data$: Observable<IReviewsData> = this.store.select(selectData);

  getAllReviews(productId: number, userId: number) {
    this.store.dispatch(ReviewsActions.getReviews({productId, userId}))
  }
}
