import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import { CatalogFilterComponent } from '../catalog-filter/catalog-filter.component';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { CatalogService } from '../../data-access/state/catalog.service';
import { combineLatest, take } from 'rxjs';
import { TFullProduct } from '../../../shared/types/fullProduct.type';
import { CommonModule } from '@angular/common';
import { ProductCardUiComponent } from '../../../shared/modules/product-card/components/product-card-ui/product-card-ui.component';
import { Store } from '@ngrx/store';
import { CatalogActions } from '../../data-access/state/catalog.actions';
import { CatalogFacade } from '../../data-access/state/catalog.facade';

@Component({
  selector: 'app-catalog-container',
  standalone: true,
  imports: [CatalogFilterComponent, CommonModule, ProductCardUiComponent],
  templateUrl: './catalog-container.component.html',
  styleUrls: ['./catalog-container.component.scss'],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogContainerComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private catalogFacade: CatalogFacade = inject(CatalogFacade);
  private catalogService: CatalogService = inject(CatalogService);

  public activeFilters = signal({} as { [key: string]: number[] });

  public filters$ = this.catalogFacade.filters$;
  public products$ = this.catalogFacade.products$;

  onEmitFilterValue(value: { id: number; category: string; checked: boolean }) {
    const { id, category, ...props } = value;

    this.activeFilters.update((currentFilters) => {
      const categoryFilters = currentFilters[category]
        ? [...currentFilters[category]]
        : [];

      const index = categoryFilters.indexOf(id);

      if (index === -1) {
        categoryFilters.push(id);
      } else {
        categoryFilters.splice(index, 1);
      }

      if (categoryFilters.length > 0) {
        return { ...currentFilters, [category]: categoryFilters };
      } else {
        const { [category]: _, ...rest } = currentFilters;
        return rest;
      }
    });

    this.catalogFacade.getProducts(this.activeFilters());
  }

  ngOnInit() {
    console.log('init');

    this.catalogFacade.getProducts({});
    this.catalogFacade.getFilters();
  }
}
