import { Routes } from '@angular/router';
import { Paths } from '../app.routes';
import { ProductDetailedContainerComponent } from './components/product-detailed/product-detailed-container/product-detailed-container.component';

export const productRoutes: Routes = [
  { path: '', component: ProductDetailedContainerComponent },
];
