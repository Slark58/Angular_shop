import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export enum Paths {
  Home = '',
  Catalog = 'Catalog',
  Signup = 'Signup',
  Signin = 'Signin',
  // Authentication = 'Authentication',
}

const routes: Routes = [
  { 
    path: Paths.Home, 
    component: MainPageComponent 
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
