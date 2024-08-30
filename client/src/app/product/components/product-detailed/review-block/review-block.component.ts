import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IReviewsData } from '../../../types/IReviewsStore.interface';
import { IReview } from '../../../types/IReviews.interface';
import { StarRatingComponent } from '../../../../shared/modules/star-rating/star-rating.component';

@Component({
  selector: 'app-review-block',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './review-block.component.html',
  styleUrls: ['./review-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewBlockComponent implements OnInit{

  @Input() review?: IReview;
  @Input() name: string = ''

  ngOnInit(): void {
      console.log(this.review);
      
  }


}
