import * as MemberActions from '../actions/member.actions';

import { createReducer, on } from '@ngrx/store';

export interface Member {
  _id: string;
  id: string;
  name: string;
  email: string;
  membershipType: string;
  booksIssued: string[];
  membershipExpiry: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMemberPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface MemberState {
  members: Member[];
  filterMembers: Member[];
  searchTerm: string;
  error: any;
  pagination: IMemberPagination;
  loading: boolean;
}

export const initialState: MemberState = {
  members: [],
  filterMembers: [],
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

export const memberReducer = createReducer(
  initialState,
  on(MemberActions.loadMembers, (state) => ({
    ...state,
    loading: true,
  })),
  on(MemberActions.loadMembersSuccess, (state, { members, pagination }) => ({
    ...state,
    members,
    pagination,
    filterMembers: members,
    loading: false,
  })),
  on(MemberActions.loadMembersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(MemberActions.registerMember, (state) => ({
    ...state,
    loading: true,
  })),
  on(MemberActions.registerMemberSuccess, (state, { member }) => ({
    ...state,
    filterMembers: [...state.members, member],
    loading: false,
  })),
  on(MemberActions.registerMemberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(MemberActions.updateMember, (state) => ({
    ...state,
    loading: true,
  })),
  on(MemberActions.updateMemberSuccess, (state, { member }) => {
    const updatedMembers = state.members.map((m) =>
      m._id === member._id ? member : m
    );
    return {
      ...state,
      members: updatedMembers,
      filterMembers: updatedMembers,
      loading: false,
    };
  }),
  on(MemberActions.updateMemberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(MemberActions.deleteMember, (state) => ({
    ...state,
    loading: true,
  })),
  on(MemberActions.deleteMemberSuccess, (state, { id }) => {
    const updatedMembers = state.members.filter((m) => m._id !== id);
    return {
      ...state,
      members: updatedMembers,
      filterMembers: updatedMembers,
      loading: false,
    };
  }),
  on(MemberActions.deleteMemberFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(MemberActions.filterMembers, (state: MemberState, { searchTerm }) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    const filterMembers = trimmedSearchTerm
      ? state.members.filter(
          (member: Member) =>
            member.name && member.name.toLowerCase().includes(trimmedSearchTerm)
        )
      : [...state.members];
    return { ...state, searchTerm, filterMembers };
  })
);
