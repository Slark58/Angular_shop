import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/interceptors/auth.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AUTH_FEATURE_KEY, authFeature } from './auth/store/reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as authEffects from './auth/store/effects';
import * as catalogEffects from './catalog/data-access/state/catalog.effects';
import * as productEffects from './product/data-access/product.effects';
import * as adminEffects from './admin-panel/data-access/admin.effects';
import * as profileEffects from './profile/data-access/profile.effects';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { catalogFeature } from './catalog/data-access/state/catalog.reducer';
import { productFeature } from './product/data-access/product.reducer';
import { adminFeature } from './admin-panel/data-access/admin.reducer';
import { profileFeatere } from './profile/data-access/profile.reducer';

registerSwiperElements();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideStore({
      [AUTH_FEATURE_KEY]: authFeature.reducer,
      [catalogFeature.name]: catalogFeature.reducer,
      [productFeature.name]: productFeature.reducer,
      [adminFeature.name]: adminFeature.reducer,
      [profileFeatere.name]: profileFeatere.reducer,
    }),
    provideEffects(
      authEffects,
      catalogEffects,
      productEffects,
      adminEffects,
      profileEffects
    ),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
