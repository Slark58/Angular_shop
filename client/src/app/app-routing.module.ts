import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminOrdersPageComponent } from './pages/admin-panel-page/childerens/admin-orders-page/admin-orders-page.component';
import { AdminUsersPageComponent } from './pages/admin-panel-page/childerens/admin-users-page/admin-users-page.component';
import { AdminProductsPageComponent } from './pages/admin-panel-page/childerens/admin-products-page/admin-products-page.component';

export enum Paths {
  Home = '',
  Catalog = 'Catalog',
  Signup = 'Signup',
  Signin = 'Signin',
  Account = 'Account',
  AdminPanel = 'AdminPanel'
}

export enum AdminPaths {
  Users = "users",
  Products = "products",
  Orders = "orders",
}

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: Paths.Home, 
        component: MainPageComponent,
      },
      { 
        path: Paths.Account, 
        component: AccountPageComponent 
      },
      { 
        path: Paths.Catalog, 
        component: CatalogPageComponent 
      },
      { 
        path: Paths.Signin, 
        component: AuthPageComponent 
      },
      { 
        path: Paths.Signup, 
        component: AuthPageComponent 
      },
    ]
  },
  { 
    path: Paths.AdminPanel, 
    component: AdminPanelPageComponent,
    children: [
      {
        path: AdminPaths.Orders,
        component: AdminOrdersPageComponent
      },
      {
        path: AdminPaths.Users,
        component: AdminUsersPageComponent
      },
      {
        path: AdminPaths.Products,
        component: AdminProductsPageComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
