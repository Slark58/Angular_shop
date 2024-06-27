import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductFacade } from '../../../data-access/product.facade';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CountOfSizeDirective } from '../../../../utils/directives/countOfSize.directive';

@Component({
  selector: 'app-product-detailed-container',
  standalone: true,
  imports: [CommonModule, CountOfSizeDirective],
  templateUrl: './product-detailed-container.component.html',
  styleUrls: ['./product-detailed-container.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailedContainerComponent implements OnInit {
  private readonly productFacade: ProductFacade = inject(ProductFacade);

  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);

  public product$ = this.productFacade.product$;

  ngOnInit() {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.productFacade.getProductById(Number(param.get('id')));
    });
  }
}
