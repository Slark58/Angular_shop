import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrdersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
