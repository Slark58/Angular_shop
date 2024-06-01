import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FullProduct } from '../../models/Main';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent {

  @Input() product?: FullProduct 

  public apiUrl = environment.URL_API;
}
