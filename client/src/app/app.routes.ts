import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/modules/layout/layout.component';
import { HomeComponent } from './home/home.component';

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
  OrderByID = 'orders/:id',
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
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./admin-panel/admin.routes').then((m) => m.adminRoutes),
  },
];
