import { Routes } from '@angular/router';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { LayoutComponent } from './shared/modules/layout/layout.component';
import { AdminOrdersPageComponent } from './pages/admin-panel-page/childerens/admin-orders-page/admin-orders-page.component';
import { AdminUsersPageComponent } from './pages/admin-panel-page/childerens/admin-users-page/admin-users-page.component';
import { AdminProductsPageComponent } from './pages/admin-panel-page/childerens/admin-products-page/admin-products-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AccountProfilePageComponent } from './pages/account-page/account-profile-page/account-profile-page.component';
import { AccountOrdersPageComponent } from './pages/account-page/account-orders-page/account-orders-page.component';
import { AccountCartPageComponent } from './pages/account-page/account-cart-page/account-cart-page.component';
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
        path: '',
        loadChildren: () =>
          import('./catalog/catalog.routes').then((m) => m.caatalogRoutes),
      },
      {
        path: '',
        loadChildren: () =>
          import('./product/product.routes').then((m) => m.productRoutes),
      },

      // {
      //   path: Paths.Account,
      //   component: AccountPageComponent,
      //   children: [
      //     {
      //       path: UserAccountPaths.Profile,
      //       component: AccountProfilePageComponent,
      //     },
      //     {
      //       path: UserAccountPaths.Cart,
      //       component: AccountCartPageComponent,
      //     },
      //     {
      //       path: UserAccountPaths.Orders,
      //       component: AccountOrdersPageComponent,
      //     },
      //   ],
      // },
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
