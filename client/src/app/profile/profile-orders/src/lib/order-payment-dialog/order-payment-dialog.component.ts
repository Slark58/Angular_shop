import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardMaskDirective } from '../../../../../utils/directives/CardMask.directive';
import { OrderFacade } from '../../../data-access/src';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-payment-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, CardMaskDirective],
  templateUrl: './order-payment-dialog.component.html',
  styleUrls: ['./order-payment-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPaymentDialogComponent implements OnInit, OnDestroy {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject<{price: number, orderId: number}>(DIALOG_DATA)

  private readonly orderFacade = inject(OrderFacade);

  isLoading$ = this.orderFacade.isLoading$
  


  isLoadingSub$?: Subscription

  paymentHanler() {
    this.orderFacade.createPayment(this.data.price, this.data.orderId);
    this.isLoadingSub$ = this.isLoading$.subscribe((isLoading) => {
      if (!isLoading) {
        this.dialogRef.close();
      }
    })
  }

  ngOnDestroy(): void {
      this.isLoadingSub$?.unsubscribe();
  }

  ngOnInit() {
    console.log(this.data);
    
  }

}
