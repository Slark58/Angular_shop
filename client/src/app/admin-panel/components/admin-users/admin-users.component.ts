import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
