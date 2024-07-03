import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './profile-cart.component.html',
  styleUrls: ['./profile-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCartComponent implements OnInit {
  items: number = 1;

  ngOnInit() {}
}
