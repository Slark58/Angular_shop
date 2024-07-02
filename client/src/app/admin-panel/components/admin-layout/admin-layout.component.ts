import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminPaths } from '../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public nav = navigationLinks;

  ngOnInit(): void {
    this.router.navigate([AdminPaths.Products], {
      relativeTo: this.activeRoute,
    });
  }
}

const navigationLinks = [
  {
    link: 'products',
    title: 'Products',
  },
  {
    link: 'users',
    title: 'User',
  },
  {
    link: 'orders',
    title: 'Orders',
  },
];
