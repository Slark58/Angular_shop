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
import { ICartItem } from '../../../../profile/profile-cart/data-access/src/lib/models/cartItem.interface';
import { ReviewsFacade } from '../../../data-access/reviews/reviews.facade';
import { Store } from '@ngrx/store';
import { selectUserID } from '../../../../auth/store/selectors';
import { ReviewModalFeedbackComponent } from '../review-modal-feedback/review-modal-feedback.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { ReviewBlockComponent } from '../review-block/review-block.component';

@Component({
  selector: 'app-product-detailed-container',
  standalone: true,
  imports: [CommonModule, CountOfSizeDirective, DialogModule, FormsModule, ReviewBlockComponent],
  templateUrl: './product-detailed-container.component.html',
  styleUrls: ['./product-detailed-container.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailedContainerComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly productFacade: ProductFacade = inject(ProductFacade);
  private readonly reviewsFacade: ReviewsFacade = inject(ReviewsFacade);
  private readonly persistService: PersistService = inject(PersistService);
  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);
  public dialog = inject(Dialog);

  public userId$ = this.store.select(selectUserID)
  public basketId = this.persistService.get('basketId') as number;
  
  public product$ = this.productFacade.product$;
  public data$ = this.reviewsFacade.data$;
  
  public productId!: number;
  public userId!: number
  public sizeId!: number;

  chouseSizeProduct(size: number) {
    this.sizeId = size;
    console.log(this.sizeId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(ReviewModalFeedbackComponent, {
      width: 'max-width',
      data: {productId: this.productId, userId: this.userId},
    });
    
    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  increaseCartItemById(productId: number, basketId: number, sizeId: number) {
    this.productFacade.increaseCartItemById(productId, basketId, sizeId);
  }

  ngOnInit() {

    combineLatest([
      this.activetedRoute.paramMap,
      this.userId$,
    ]).pipe(
      map(([paramMap, userId]) => ({
        productId: Number(paramMap.get('id')),
        userId: userId,
      }))
    ).subscribe(({productId, userId}) => {
      this.productFacade.getProductById(productId);
      this.productId = productId;
      if(userId){
        this.userId = userId;
        this.reviewsFacade.getAllReviews(productId, userId)
      }
    })


  }
}
