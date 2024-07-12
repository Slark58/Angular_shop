import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/modules/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './admin-panel/components/admin-layout/admin-layout.component';
import { AdminProductsComponent } from './admin-panel/components/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-panel/components/admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-panel/components/admin-orders/admin-orders.component';

export enum Paths {
  Home = '',
  Catalog = 'Catalog',
  Signup = 'Signup',
  Signin = 'Signin',
  Account = 'Account',
  AdminPanel = 'AdminPanel',
  Product = 'Catalog/:id',
}

export enum AdminPaths {
  Users = 'users',
  Products = 'products',
  Orders = 'orders',
}

export enum UserAccountPaths {
  Profile = 'profile',
  Cart = 'cart',
  Orders = 'orders',
}

export const routes: Routes = [
  {
    path: Paths.Home,
    component: LayoutComponent,
    children: [
      {
        path: Paths.Home,
        component: HomeComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.routes').then((m) => m.authRoutes),
      },
      {
        path: Paths.Catalog,
        loadChildren: () =>
          import('./catalog/catalog.routes').then((m) => m.caatalogRoutes),
      },
      {
        path: Paths.Product,
        loadChildren: () =>
          import('./product/product.routes').then((m) => m.productRoutes),
      },

      {
        path: Paths.Account,
        loadChildren: () =>
          import('./profile/profile.routes').then((m) => m.routes),
      },

      // {
      //   path: Paths.Catalog,
      //   component: CatalogPageComponent,
      // },
      // {
      //   path: Paths.Signup,
      //   component: AuthPageComponent,
      // },
      // {
      //   path: Paths.Product,
      //   component: ProductPageComponent,
      // },
    ],
  },
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
  // {
  //   path: Paths.AdminPanel,
  //   component: AdminPanelPageComponent,
  //   children: [
  //     {
  //       path: AdminPaths.Orders,
  //       component: AdminOrdersPageComponent,
  //     },
  //     {
  //       path: AdminPaths.Users,
  //       component: AdminUsersPageComponent,
  //     },
  //     {
  //       path: AdminPaths.Products,
  //       component: AdminProductsPageComponent,
  //     },
  //   ],
  // },
];
