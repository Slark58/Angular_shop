import { Routes } from '@angular/router';
import { Paths } from '../app.routes';
import { CatalogContainerComponent } from './components/catalog-container/catalog-container.component';

export const caatalogRoutes: Routes = [
  { path: Paths.Catalog, component: CatalogContainerComponent },
];
