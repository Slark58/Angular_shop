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
import { combineLatest, map, Observable } from 'rxjs';
import { TFullProduct } from '../../../../shared/types/fullProduct.type';
import { ProfileFacade } from '../../../../profile/data-access/profile.facade';
import { ICartItem } from '../../../../profile/types/cartItem.interface';

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
  private readonly profileFacade: ProfileFacade = inject(ProfileFacade);
  private readonly persistService: PersistService = inject(PersistService);
  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);

  public basketId = this.persistService.get('basketId') as number;
  public sizeId!: number;
  public productId!: number;
  public product$ = this.productFacade.product$;
  public cartItems$ = this.profileFacade.cartItems$;

  inCart$ = combineLatest([this.product$, this.cartItems$]).pipe(
    map(
      ([product, cartProducts]: [
        product: TFullProduct | null,
        cartProducts: ICartItem[] | undefined
      ]) => {
        if (!product || !cartProducts) return false;

        const charProductID = product.chars.find(
          (item) => item.sizeId === this.sizeId
        )?.id;

        console.log('charProductID: ', charProductID);

        const quantityFindProduct = cartProducts.find(
          (item) => item.product_char.id === charProductID
        )?.quantity;

        console.log('quantityFindProduct: ', quantityFindProduct);

        if (quantityFindProduct) {
          return quantityFindProduct > 0;
        }

        return false;
      }
    )
  );

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
