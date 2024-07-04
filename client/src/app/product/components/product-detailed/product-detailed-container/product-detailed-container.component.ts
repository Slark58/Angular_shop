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

  public size: number | null = null;
  public productId: number | null = null;
  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);
  public basketId: string | null = localStorage.getItem('basketId');
  public product$ = this.productFacade.product$;

  chouseSizeProduct(size: number | null) {
    this.size = size;
    console.log(this.size);
  }

  increaseCartItemById(productId: number | null, basketId: string | null) {
    this.productFacade.increaseCartItemById(productId, basketId);
  }

  ngOnInit() {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.productId = Number(param.get('id'));
      console.log(this.productId);
      this.productFacade.getProductById(this.productId);
    });
  }
}
