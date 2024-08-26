import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IReviewsData } from '../../../types/IReviewsStore.interface';

@Component({
  selector: 'app-review-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-block.component.html',
  styleUrls: ['./review-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewBlockComponent implements OnInit {

  @Input() review?: IReviewsData;

  ngOnInit() {
  }

}
