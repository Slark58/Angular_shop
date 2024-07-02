import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-cart',
  standalone: true,
  templateUrl: './profile-cart.component.html',
  styleUrls: ['./profile-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
