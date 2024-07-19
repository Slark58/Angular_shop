import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders-container.component.html',
  styleUrls: ['./admin-orders-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrdersContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
