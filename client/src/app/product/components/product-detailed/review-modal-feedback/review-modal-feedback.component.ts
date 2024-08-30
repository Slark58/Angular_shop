import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { StarRatingComponent } from "../../../../shared/modules/star-rating/star-rating.component";

@Component({
  selector: 'app-review-modal-feedback',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './review-modal-feedback.component.html',
  styleUrls: ['./review-modal-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewModalFeedbackComponent implements OnInit {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA)

  ngOnInit() {
  }

}
