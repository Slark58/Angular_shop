import { Routes } from '@angular/router';
import { UserAccountPaths } from '../app.routes';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CartContainerComponent } from './profile-cart/src';
import { OrderContainerComponent } from './profile-orders/src';

export const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      {
        path: UserAccountPaths.Profile,
        component: ProfileInfoComponent,
      },
      {
        path: UserAccountPaths.Cart,
        component: CartContainerComponent,
      },
      {
        path: UserAccountPaths.Orders,
        component: OrderContainerComponent,
      },
    ],
  },
];
