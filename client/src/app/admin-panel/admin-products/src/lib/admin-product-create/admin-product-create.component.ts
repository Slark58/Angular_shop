import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductCreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
