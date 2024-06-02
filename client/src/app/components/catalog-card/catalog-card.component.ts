import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { FullProduct } from '../../models/Main';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent {

  @Input() product?: FullProduct 
  router: Router = inject(Router)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  public apiUrl = environment.URL_API;

  public redirecToProduct(id: number | undefined) {
    this.router.navigate([`${id}`], {relativeTo: this.activatedRoute})
  }

}
