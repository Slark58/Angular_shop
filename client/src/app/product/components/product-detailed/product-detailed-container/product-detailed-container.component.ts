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
import { PersistService } from '../../../../shared/services/persist.service';

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

  private readonly persistService: PersistService = inject(PersistService);

  public basketId = this.persistService.get('basketId') as number;
  public sizeId!: number;
  public productId!: number;
  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);
  // public basketId: string | null = localStorage.getItem('basketId');
  public product$ = this.productFacade.product$;

  chouseSizeProduct(size: number) {
    this.sizeId = size;
    console.log(this.sizeId);
  }

  increaseCartItemById(productId: number, basketId: number, sizeId: number) {
    this.productFacade.increaseCartItemById(productId, basketId, sizeId);
  }

  ngOnInit() {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.productId = Number(param.get('id'));
      console.log(this.productId);
      this.productFacade.getProductById(this.productId);
    });
  }
}
