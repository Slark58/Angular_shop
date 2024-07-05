import { Routes } from '@angular/router';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { UserAccountPaths } from '../app.routes';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileCartComponent } from './components/profile-cart/profile-cart.component';
import { ProfileOrdersComponent } from './components/profile-orders/profile-orders.component';

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
        component: ProfileCartComponent,
      },
      {
        path: UserAccountPaths.Orders,
        component: ProfileOrdersComponent,
      },
    ],
  },
];
