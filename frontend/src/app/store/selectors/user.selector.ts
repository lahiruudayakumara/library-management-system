import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.filterUsers
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectSearchTerm = createSelector(
  selectUserState,
  (state) => state.searchTerm
);

export const selectUserPagination = createSelector(
  selectUserState,
  (state) => state.pagination
);
