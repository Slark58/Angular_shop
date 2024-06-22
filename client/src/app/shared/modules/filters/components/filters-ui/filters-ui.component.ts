import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
  providers: [FiltersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersUiComponent implements OnInit {
  private filterService = inject(FiltersService);
  public filtersSignal = signal([] as IFiltersResponse[]);

  getValue(e: Event) {
    const value = e.target as HTMLInputElement;
    console.log(Number(value.value));
  }

  getValueMat(value: MatCheckboxChange) {
    console.log(value.source.value);
  }

  ngOnInit() {
    this.filterService
      .getFilters()
      .pipe(
        take(1),
        tap((filters) => console.log(filters))
      )
      .subscribe((filters) => this.filtersSignal.set(filters));
  }
}
