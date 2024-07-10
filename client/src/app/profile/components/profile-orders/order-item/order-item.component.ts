import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IProductChar } from '../../../../shared/types/productChar.interface';
import { RouterModule } from '@angular/router';
import { IOrderItem } from '../../../types/orderItem.interface';

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
