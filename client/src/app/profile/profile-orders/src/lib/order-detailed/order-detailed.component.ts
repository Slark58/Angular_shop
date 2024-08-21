import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFacade } from '../../../data-access/src';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { OrderPaymentDialogComponent } from '../order-payment-dialog/order-payment-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule],
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailedComponent implements OnInit {
  private readonly orderFacade = inject(OrderFacade)
  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);
  public orderId: number | null = null

  public selectOrderDetailed$ = this.orderFacade.selectOrderDetailed$
  public user$ = this.orderFacade.user$

  dialog = inject(Dialog);

  price: number | undefined | null = null

  openDialog(): void {

    const dialogRef = this.dialog.open<string>(OrderPaymentDialogComponent, {
      width: 'max-width',
      data: {price: this.price},
    });
    
    dialogRef.closed.subscribe(result => {
      console.log(result);
      if (this.price) {
        this.orderFacade.createPayment(this.price)
      }
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.orderId = Number(param.get('id'));
      console.log(this.orderId);
      
      this.orderFacade.getOrderById(this.orderId)
    })
  
    this.selectOrderDetailed$.pipe(take(1)).subscribe(order => {
      this.price = order?.price
    })
  }

}
