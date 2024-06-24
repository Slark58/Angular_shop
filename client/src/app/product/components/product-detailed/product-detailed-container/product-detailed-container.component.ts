import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detailed-container',
  standalone: true,
  templateUrl: './product-detailed-container.component.html',
  styleUrls: ['./product-detailed-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailedContainerComponent implements OnInit {
  constructor() {}

  private activetedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activetedRoute.paramMap.subscribe((param) => {
      console.log(param.get('id'));
    });
  }
}
