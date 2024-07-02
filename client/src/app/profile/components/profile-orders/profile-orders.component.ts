import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-orders',
  standalone: true,
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOrdersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
