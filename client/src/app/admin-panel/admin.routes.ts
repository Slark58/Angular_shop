import { Routes } from '@angular/router';
import { AdminPaths, Paths } from '../app.routes';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProductsContainerComponent } from './admin-products/src';
import { AdminOrdersContainerComponent } from './admin-orders/src';
import { AdminUsersContainerComponent } from './admin-users/src';
import { AdminProductCreateComponent } from './admin-products/src/lib/admin-product-create/admin-product-create.component';
import { AdminProductInfoComponent } from './admin-products/src/lib/admin-product-info/admin-product-info.component';

export const adminRoutes: Routes = [
  {
    path: 'AdminPanel/products',
    redirectTo: 'AdminPanel/products/create',
    pathMatch: 'full',
  },
  {
    path: Paths.AdminPanel,
    component: AdminLayoutComponent,
    children: [
      {
        path: AdminPaths.Products,
        component: AdminProductsContainerComponent,
        children: [
          {
            path: 'create',
            component: AdminProductCreateComponent,
          },
          {
            path: 'info',
            component: AdminProductInfoComponent,
          },
        ],
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
