import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountPaths } from '../../app.routes';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
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
