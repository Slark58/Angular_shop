import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TableComponent } from '../../../../../shared/modules/UI/table/table.component';
import { AdminUsersFacade } from '../../../data-access/src';

@Component({
  selector: 'app-admin-users-container',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './admin-users-container.component.html',
  styleUrls: ['./admin-users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersContainerComponent implements OnInit {
  private readonly adminUsersFacade = inject(AdminUsersFacade);

  ngOnInit() {
    this.adminUsersFacade.getAllUsers();
  }
}
