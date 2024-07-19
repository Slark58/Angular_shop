import { Routes } from '@angular/router';
import { AdminPaths, Paths } from '../app.routes';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProductsContainerComponent } from './admin-products/src';
import { AdminOrdersContainerComponent } from './admin-orders/src';
import { AdminUsersContainerComponent } from './admin-users/src';

export const adminRoutes: Routes = [
  {
    path: Paths.AdminPanel,
    component: AdminLayoutComponent,
    children: [
      {
        path: AdminPaths.Products,
        component: AdminProductsContainerComponent,
      },
      {
        path: AdminPaths.Orders,
        component: AdminOrdersContainerComponent,
      },
      {
        path: AdminPaths.Users,
        component: AdminUsersContainerComponent,
      },
    ],
  },
];
