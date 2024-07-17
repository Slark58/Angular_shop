import { Routes } from '@angular/router';
import { AdminPaths, Paths } from '../app.routes';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

export const adminRoutes: Routes = [
  {
    path: Paths.AdminPanel,
    component: AdminLayoutComponent,
    children: [
      {
        path: AdminPaths.Products,
        component: AdminProductsComponent,
      },
      {
        path: AdminPaths.Orders,
        component: AdminOrdersComponent,
      },
      {
        path: AdminPaths.Users,
        component: AdminUsersComponent,
      },
    ],
  },
];
