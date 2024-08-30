import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent implements OnInit{
  @Input() rating: number = 0; 
  @Input() readOnly: boolean = false; 
  @Input() groupName: string = '' 


  public randomNum: number = 0

  randomNumber(): number {
    return Math.random()
  }

  ngOnInit(): void {
      console.log(this.rating);
      this.randomNum = this.randomNumber();
    }

 
  // @Output() ratingChange = new EventEmitter<number>(); // Событие изменения рейтинга

  stars: number[] = [0, 1, 2, 3, 4, 5];

  // onRatingChange(newRating: number) {
  //   if (!this.readOnly) {
  //     this.rating = newRating;
  //     this.ratingChange.emit(this.rating); // Эмитируем изменение рейтинга
  //   }
  // }

}

