import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users-container.component.html',
  styleUrls: ['./admin-users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
