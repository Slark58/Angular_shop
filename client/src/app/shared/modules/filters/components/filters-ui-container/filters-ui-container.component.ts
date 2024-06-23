import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FiltersService } from '../../data-access/service/filters.service';
import { take, tap } from 'rxjs';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { FiltersUiComponent } from '../filters-ui/filters-ui.component';

@Component({
  selector: 'app-filters-ui-container',
  standalone: true,
  imports: [FiltersUiComponent],
  templateUrl: './filters-ui-container.component.html',
  styleUrls: ['./filters-ui-container.component.scss'],
  providers: [FiltersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersUiContainerComponent implements OnInit {
  private filterService = inject(FiltersService);

  public filtersSignal = signal([] as IFiltersResponse[]);
  public activeFilters = signal({} as { [key: string]: number[] });

  click() {
    console.log(this.activeFilters());
  }

  onEmitFilterValue(value: { id: number; category: string; checked: boolean }) {
    console.log('onEmitFilterValue', value);
    const { id, category, checked } = value;

    this.activeFilters.update((currentFilters) => {
      if (!currentFilters[category]) {
        currentFilters[category] = [id];
      } else {
        const itemIndex = currentFilters[category].findIndex(
          (item) => item === id
        );
        if (itemIndex === -1) {
          currentFilters[category].push(id);
        } else {
          currentFilters[category].splice(itemIndex, 1);
        }
      }

      return currentFilters;
    });

    console.log(this.activeFilters()[category]);
  }

  ngOnInit() {
    this.filterService
      .getFilters()
      .pipe(take(1))
      .subscribe((filters) => this.filtersSignal.set(filters));
  }
}
