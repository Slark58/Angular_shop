import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
