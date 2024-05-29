import { Component, OnInit, inject } from '@angular/core';
import { FiltersService } from '../../services/filters.service';
import { Observable, Subject } from 'rxjs';
import { FiltersResponse } from '../../models/Response';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
  
  filtersService: FiltersService = inject(FiltersService)

  ngOnInit(): void {
    this.filtersService.getAllFilters()
    // console.log(this.filtersService.filtersSubject$);
    
  }

}
