// reducers/user.reducer.ts

import * as UserActions from '../actions/user.actions';

import { createReducer, on } from '@ngrx/store';

interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface UserState {
  users: User[];
  filterUsers: User[];
  searchTerm: string;
  pagination: IUserPagination;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  filterUsers: [],
  searchTerm: '',
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
  },
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users, pagination }) => ({
    ...state,
    users,
    filterUsers: users,
    pagination,
    error: null,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.loadStaffUsersSuccess, (state, { users }) => ({
    ...state,
    staffUsers: users,
    error: null,
  })),
  on(UserActions.loadStaffUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.addUser, (state) => ({ ...state, loading: true })),
  on(UserActions.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    filterUsers: [...state.users, user],
    loading: false,
    error: null,
  })),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u._id === user._id ? user : u)),
    filterUsers: state.filterUsers.map((u) => (u._id === user._id ? user : u)),
    loading: false,
    error: null,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u._id !== id),
    filterUsers: state.filterUsers.filter((u) => u._id !== id),
    loading: false,
    error: null,
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.filterUsers, (state: UserState, { searchTerm }) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    const filterUsers = trimmedSearchTerm
      ? state.users.filter(
        (user: User) =>
          user.name && user.name.toLowerCase().includes(trimmedSearchTerm)
      )
      : [...state.users];
    return { ...state, searchTerm, filterUsers };
  })
);
