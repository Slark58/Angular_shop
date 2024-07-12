import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IOrderItem } from '../../../data-access/src/lib/models/orderItem.interface';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent implements OnInit {
  @Input('orderItem') orderItemProps?: IOrderItem;

  ngOnInit() {}
}
