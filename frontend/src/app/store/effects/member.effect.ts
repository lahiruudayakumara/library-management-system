import * as MemberActions from '../actions/member.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ApiService } from '../../core/services/api.service';

@Injectable()
export class MemberEffects {
  private memberService: ApiService = inject(ApiService);
  actions$ = inject(Actions);

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.loadMembers),
      mergeMap(({ page, limit }) =>
        this.memberService.getMembers(page, limit).pipe(
          map((members) => MemberActions.loadMembersSuccess({
            members: members.data,
            pagination: members.pagination
          })),
          catchError((error) => of(MemberActions.loadMembersFailure({ error })))
        )
      )
    )
  );

  filterMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.filterMembers),
      mergeMap(({ searchTerm, pageSize, page }) =>
        this.memberService.filterMembers(searchTerm).pipe(
          map((members) => MemberActions.filterMembersSuccess({
            filterMembers: members.data,
            pagination: {
              currentPage: page,
              pageSize: pageSize,
              totalPages: members.data.length / pageSize,
              totalItems: members.data.length

            }
          })),
          catchError((error) => of(MemberActions.filterMembersFailure({ error })))
        )
      )
    )
  );

  registerMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.registerMember),
      mergeMap(({ data }) =>
        this.memberService.registerMember(data).pipe(
          map((member) => MemberActions.registerMemberSuccess({ member: member.data })),
          catchError((error) => of(MemberActions.registerMemberFailure({ error })))
        )
      )
    )
  );

  updateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.updateMember),
      mergeMap(({ data }) =>
        this.memberService.updateMember(data).pipe(
          map((member) => MemberActions.updateMemberSuccess({ member: member.data })),
          catchError((error) => of(MemberActions.updateMemberFailure({ error })))
        )
      )
    )
  );

  deleteMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemberActions.deleteMember),
      mergeMap(({ id }) =>
        this.memberService.deleteMember(id).pipe(
          map(() => MemberActions.deleteMemberSuccess({ id })),
          catchError((error) => of(MemberActions.deleteMemberFailure({ error })))
        )
      )
    )
  );
}
