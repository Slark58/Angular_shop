import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';
import { ProfileFacade } from '../../data-access/profile.facade';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../../data-access/profile.actions';
import { userSelector } from '../../../auth/store/selectors';
import { filter, map, take } from 'rxjs';
import { selectOrderItems } from '../../data-access/profile.selectors';

@Component({
  selector: 'app-profile-orders',
  standalone: true,
  imports: [CommonModule, OrderItemComponent],
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOrdersComponent implements OnInit {
  private readonly store: Store = inject(Store);

  public userId$ = this.store.select(userSelector);
  public orderItems$ = this.store.select(selectOrderItems);

  public getOrdersById() {
    this.userId$
      .pipe(
        map((user) => user?.id),
        filter(Boolean)
      )
      .subscribe((id) => {
        this.store.dispatch(ProfileActions.getOrders({ userId: id }));
      });
  }

  ngOnInit() {
    this.getOrdersById();
  }
}
