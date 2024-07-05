import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TFullProduct } from '../../../../types/fullProduct.type';

@Component({
  selector: 'app-product-card-ui',
  standalone: true,
  imports: [CommonModule, MatCard, MatButton, MatIcon],
  templateUrl: './product-card-ui.component.html',
  styleUrls: ['./product-card-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardUiComponent {
  @Input('product') productProps?: TFullProduct;
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public apiUrl = environment.URL_API;

  public click(e: Event) {
    e.stopPropagation();

    console.log('click');
  }

  public redirecToProduct(id: number | undefined) {
    this.router.navigate([`${id}`], { relativeTo: this.activatedRoute });
  }
}
