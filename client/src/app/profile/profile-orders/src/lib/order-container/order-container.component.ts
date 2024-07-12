import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { OrderItemComponent } from '../order-item/order-item.component';
import { Store } from '@ngrx/store';
import { OrderFacade } from '../../../data-access/src';

@Component({
  selector: 'app-order-container',
  standalone: true,
  imports: [CommonModule, OrderItemComponent],
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderContainerComponent implements OnInit {
  private readonly orderFacade = inject(OrderFacade);

  public orderItems$ = this.orderFacade.orderItems$;

  ngOnInit() {
    this.orderFacade.getOrdersById();
  }
}
