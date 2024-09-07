import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { IReviewsData } from '../../../types/IReviewsStore.interface';
import { IReview } from '../../../types/IReviews.interface';
import { StarRatingComponent } from '../../../../shared/modules/star-rating/star-rating.component';
import { RateOptions } from '../../../../shared/types/rate.interface';
import { Store } from '@ngrx/store';
import { ReviewsFacade } from '../../../data-access/reviews/reviews.facade';
import { take } from 'rxjs';

@Component({
  selector: 'app-review-block',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './review-block.component.html',
  styleUrls: ['./review-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewBlockComponent implements OnInit{
  private readonly reviewsFacade = inject(ReviewsFacade)
  @Input() review: IReview = {} as IReview

  private userId$ = this.reviewsFacade.userId$

  public userId: number | null = null

  constructor() { }

  ngOnInit(): void {
      
    this.userId$.pipe(take(1)).subscribe(userId => {
        if (userId) {
          this.userId = userId
        }
      })
    
  }

  public ratesOptions: RateOptions = {
    rates: 5,
    readOnly: true,
  }


}
