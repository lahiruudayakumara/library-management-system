import { createAction, props } from '@ngrx/store';

import { IMemberPagination } from '../reducers/member.reducer';

export const loadMembers = createAction(
  '[Member API] Load Members',
  props<{ page?: number; limit?: number }>()
);

export const loadMembersSuccess = createAction(
  '[Member API] Load Members Success',
  props<{ members: any; pagination: IMemberPagination }>()
);

export const setSearchTerm = createAction(
  '[Table] Set Search Term',
  props<{ searchTerm: string }>()
);

export const loadMembersFailure = createAction(
  '[Member API] Load Members Failure',
  props<{ error: any }>()
);

export const filterMembers = createAction(
  '[Member API] Filter Members',
  props<{ searchTerm: string, pageSize: number, page: number }>()
);

export const filterMembersSuccess = createAction(
  '[Member API] Filter Members Success',
  props<{ filterMembers: any; pagination: IMemberPagination }>()
);

export const filterMembersFailure = createAction(
  '[Member API] Filter Members Failure',
  props<{ error: any }>()
);

export const registerMember = createAction(
  '[Member API] Register Member',
  props<{ data: any }>()
);

export const registerMemberSuccess = createAction(
  '[Member API] Register Member Success',
  props<{ member: any }>()
);

export const registerMemberFailure = createAction(
  '[Member API] Register Member Failure',
  props<{ error: any }>()
);

export const updateMember = createAction(
  '[Member API] Update Member',
  props<{ data: any }>()
);

export const updateMemberSuccess = createAction(
  '[Member API] Update Member Success',
  props<{ member: any }>()
);

export const updateMemberFailure = createAction(
  '[Member API] Update Member Failure',
  props<{ error: any }>()
);

export const deleteMember = createAction(
  '[Member API] Delete Member',
  props<{ id: string }>()
);

export const deleteMemberSuccess = createAction(
  '[Member API] Delete Member Success',
  props<{ id: string }>()
);

export const deleteMemberFailure = createAction(
  '[Member API] Delete Member Failure',
  props<{ error: any }>()
);
