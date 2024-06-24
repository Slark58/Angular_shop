import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent {
  @Input({ required: true }) filtersProps: IFiltersResponse[] | null = [];

  @Output() emitFilterValue = new EventEmitter<{
    id: number;
    category: string;
    checked: boolean;
  }>();

  getValue(e: Event, title: string) {
    const element = e.target as HTMLInputElement;
    this.emitFilterValue.emit({
      category: title,
      checked: element.checked,
      id: Number(element.value),
    });
  }

  // click() {
  //   console.log(this.activeFilters());
  // }
}
