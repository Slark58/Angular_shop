import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detailed-comments',
  standalone: true,
  templateUrl: './product-detailed-comments.component.html',
  styleUrls: ['./product-detailed-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailedCommentsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
