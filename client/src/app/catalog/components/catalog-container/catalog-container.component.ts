import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CatalogFilterComponent } from '../catalog-filter/catalog-filter.component';
import { IFiltersResponse } from '../../types/filterResponse.interface';
import { CatalogService } from '../../data-access/services/catalog.service';
import { combineLatest, take } from 'rxjs';
import { TFullProduct } from '../../../shared/types/fullProduct.type';
import { CommonModule } from '@angular/common';
import { ProductCardUiComponent } from '../../../shared/modules/product-card/components/product-card-ui/product-card-ui.component';

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
  private catalogService: CatalogService = inject(CatalogService);
  public activeFilters = signal({} as { [key: string]: number[] });
  public filtersSig = signal<IFiltersResponse[] | null>([]);
  public productsSig = signal<TFullProduct[] | null>([]);

  onEmitFilterValue(value: { id: number; category: string; checked: boolean }) {
    const { id, category, ...props } = value;

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
    combineLatest([
      this.catalogService.getFilters(),
      this.catalogService.getPropducts(),
    ])
      .pipe(take(1))
      .subscribe(
        ([filters, products]: [
          IFiltersResponse[] | null,
          TFullProduct[] | null
        ]) => {
          this.filtersSig.set(filters);
          this.productsSig.set(products);
          console.log(...[filters, products]);
        }
      );
  }
}
