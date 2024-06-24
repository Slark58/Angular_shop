import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  // filtersService: FiltersService = inject(FiltersService);
  // productsService: ProductsService = inject(ProductsService);

  ngOnInit(): void {
    // this.filtersService.getAllFilters();
    // this.productsService.getProducts();
    // console.log(this.filtersService.filtersSubject$);
  }
}
