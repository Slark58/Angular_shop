import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminPaths, UserAccountPaths } from '../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent implements OnInit {
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public nav = navigationLinks;

  ngOnInit(): void {
    this.router.navigate([UserAccountPaths.Profile], {
      relativeTo: this.activeRoute,
    });
  }
}

const navigationLinks = [
  {
    link: 'profile',
    title: 'Profile',
  },
  {
    link: 'cart',
    title: 'Cart',
  },
  {
    link: 'orders',
    title: 'Orders',
  },
];
