import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MemberState } from '../reducers/member.reducer';

export const selectMemberState = createFeatureSelector<MemberState>('members');

export const selectMembers = createSelector(
  selectMemberState,
  (state) => state.filterMembers
);

export const selectMemberError = createSelector(
  selectMemberState,
  (state) => state.error
);

export const selectMemberLoading = createSelector(
  selectMemberState,
  (state) => state.loading
);

export const selectSearchTerm = createSelector(
  selectMemberState,
  (state) => state.searchTerm
);

export const selectMemberPagination = createSelector(
  selectMemberState,
  (state) => state.pagination
);
