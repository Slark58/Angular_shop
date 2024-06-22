import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { FullProduct } from '../../../../../models/Main';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-product-card-ui',
  standalone: true,
  templateUrl: './product-card-ui.component.html',
  styleUrls: ['./product-card-ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardUiComponent {
  @Input('product') productProps?: FullProduct;
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public apiUrl = environment.URL_API;

  public redirecToProduct(id: number | undefined) {
    this.router.navigate([`${id}`], { relativeTo: this.activatedRoute });
  }
}
