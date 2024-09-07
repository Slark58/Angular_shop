import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { StarRatingComponent } from "../../../../shared/modules/star-rating/star-rating.component";
import { RateOptions } from '../../../../shared/types/rate.interface';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsFacade } from '../../../data-access/reviews/reviews.facade';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-review-modal-feedback',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, ReactiveFormsModule],
  templateUrl: './review-modal-feedback.component.html',
  styleUrls: ['./review-modal-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewModalFeedbackComponent implements OnInit {
  public readonly _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly reviewsFacade = inject(ReviewsFacade);
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject<{productId: number, userId: number}>(DIALOG_DATA)

  public isLoading$ = this.reviewsFacade.isLoading$

  public isLoadingSub$!: Subscription

  constructor() {}


  public ratesOptions: RateOptions = {  
    rates: 5,
    readOnly: false,
  }

  public reviewForm = this._fb.group({
    rate: [<number | null>null, [Validators.required]],
    comment: [''],
  })

  createReview() {
    if(this.reviewForm.valid) {
      const {comment, rate} = this.reviewForm.getRawValue()
      this.reviewsFacade.createReview(comment, this.data.productId, rate, this.data.userId)
      this.isLoadingSub$ = this.isLoading$.subscribe({
        next: (loading) => {
          if (!loading) {
            this.dialogRef.close()
          }
        },
      })
    }
  }

  ngOnInit() {
    
  }

}
