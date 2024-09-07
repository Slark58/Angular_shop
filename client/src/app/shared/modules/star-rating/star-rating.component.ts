import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RateOptions } from '../../types/rate.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StarRatingComponent,
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor, OnInit{
  @Input() options!: RateOptions;
  @Input() rate: number | undefined = 0
  constructor() {
  }
  public currentRate: number = 0  
  public ratesArr: number[] = []
  public desibled = false
  public touched = false
  
  onChange = (currentRate: number) => {}
  onToched = () => {}

  ngOnInit(): void {
    this.fillRatesArr()
    if(this.rate) {
      this.currentRate = this.rate
    }
    }

  public OnRate(index: number) {
    this.markAsTouched()
    if(!this.desibled) {
      this.currentRate = index
      this.onChange(this.currentRate)
    }
  } 

     //! START Methods of ControlValueAccessor
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onToched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.desibled = isDisabled
  }

  writeValue(rate: number): void {
    this.currentRate = rate
  }

  markAsTouched() {
    if(!this.touched) {
      this.onToched()
      this.touched = true
    }
  }
  //! END Methods of ControlValueAccessor
  
  
  private fillRatesArr(): void {
    let coud = true 
    let count = 1;

    while(coud) {
      this.ratesArr.push(count)
      if(count === this.options.rates) {
        coud = false
      } else {
        count++
      }
    }
  }
  // @Output() ratingChange = new EventEmitter<number>(); // Событие изменения рейтинга
  
  // onRatingChange(newRating: number) {
  //   if (!this.readOnly) {
  //     this.rating = newRating;
  //     this.ratingChange.emit(this.rating); // Эмитируем изменение рейтинга
  //   }
  // }

}

