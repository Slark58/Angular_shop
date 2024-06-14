import { createFeature, createReducer, on } from '@ngrx/store';

export const AUTH_FEATURE_KEY = 'auth';

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer({}),
});
