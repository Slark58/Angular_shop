import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ProfileFacade } from '../../data-access/profile.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoComponent {
  private readonly profileFacade: ProfileFacade = inject(ProfileFacade);

  public user$ = this.profileFacade.user$;
  public errorUser$ = this.profileFacade.errorUser$;
  public isLoadingUser$ = this.profileFacade.isLoadingUser$;
}
