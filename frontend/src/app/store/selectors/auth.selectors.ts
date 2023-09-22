import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);
