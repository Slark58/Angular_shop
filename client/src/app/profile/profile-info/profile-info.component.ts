import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersistService } from '../../shared/services/persist.service';
import { Store } from '@ngrx/store';
import { logoutAction } from '../../auth/store/actions/logout.action';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoComponent {
  public readonly store: Store = inject(Store);

  logout() {
    this.store.dispatch(logoutAction());
  }
}
