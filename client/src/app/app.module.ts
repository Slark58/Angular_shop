import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './components/header/header.component';
import { SwiperDirective } from './utils/directives/swiper.directive';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { FormShadowDirective } from './utils/directives/formShadow.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { CatalogCardComponent } from './components/catalog-card/catalog-card.component';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminOrdersPageComponent } from './pages/admin-panel-page/childerens/admin-orders-page/admin-orders-page.component';
import { AdminUsersPageComponent } from './pages/admin-panel-page/childerens/admin-users-page/admin-users-page.component';
import { AdminProductsPageComponent } from './pages/admin-panel-page/childerens/admin-products-page/admin-products-page.component';
import { CreateProductDialogComponent } from './components/UI/create-product-dialog/create-product-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SwiperDirective,
    MainPageComponent,
    CatalogPageComponent,
    AuthFormComponent,
    AuthPageComponent,
    CatalogCardComponent,
    FormShadowDirective,
    AdminPanelPageComponent,
    LayoutComponent,
    AdminOrdersPageComponent,
    AdminUsersPageComponent,
    AdminProductsPageComponent,
    CreateProductDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
