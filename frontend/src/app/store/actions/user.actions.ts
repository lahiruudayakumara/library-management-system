import { IUserPagination, UserState } from '../reducers/user.reducer';
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page?: number; limit?: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any, pagination: IUserPagination }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const loadStaffUsers = createAction(
  '[Staff User] Load Staff Users',
  props<{ page?: number; limit?: number }>()
);

export const loadStaffUsersSuccess = createAction(
  '[Staff User] Load Staff Users Success',
  props<{ users: any }>()
);

export const loadStaffUsersFailure = createAction(
  '[Staff User] Load Staff Users Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[User] Add User',
  props<{ data: any }>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: any }>()
);

export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ data: any }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: any }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

export const filterUsers = createAction(
  '[Member API] Filter Members',
  props<{ searchTerm: string, pageSize: number, page: number }>()
);

export const filterUserSuccess = createAction(
  '[Member API] Filter Members Success',
  props<{ filterMembers: UserState, pagination: IUserPagination }>()
);

export const filterUserFailure = createAction(
  '[Member API] Filter Members Failure',
  props<{ error: any }>()
);
