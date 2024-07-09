import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
