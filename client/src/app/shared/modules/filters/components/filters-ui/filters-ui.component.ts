import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { FiltersService } from '../../data-access/service/filters.service';
import { map, take, tap } from 'rxjs';
import { IFiltersResponse } from '../../types/filterResponse.interface';

@Component({
  selector: 'app-filters-ui',
  imports: [MatCheckboxModule, CommonModule],
  standalone: true,
  templateUrl: './filters-ui.component.html',
  styleUrls: ['./filters-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersUiComponent implements OnChanges {
  @Input({ required: true }) filtersProps?: IFiltersResponse[];

  @Output() emitFilterValue = new EventEmitter<{
    id: number;
    category: string;
    checked: boolean;
  }>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.filtersProps);
  }

  getValue(e: Event, title: string) {
    const element = e.target as HTMLInputElement;
    this.emitFilterValue.emit({
      category: title,
      checked: element.checked,
      id: Number(element.value),
    });
  }
}
