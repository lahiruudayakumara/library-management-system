// effects/user.effects.ts

import * as UserActions from '../actions/user.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ApiService } from '../../core/services/api.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private userService: ApiService = inject(ApiService);
  actions$ = inject(Actions);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap((action) =>
        this.userService.getUsers(action.page, action.limit).pipe(
          map((users) => UserActions.loadUsersSuccess({
            users: users.data,
            pagination: users.pagination
           })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  filterUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.filterUsers),
      mergeMap(({ searchTerm, pageSize, page }) =>
        this.userService.filterMembers(searchTerm).pipe(
          map((members) => UserActions.filterUserSuccess({
            filterMembers: members.data,
            pagination: {
              currentPage: page,
              pageSize: pageSize,
              totalPages: members.data.length / pageSize,
              totalItems: members.data.length
            }
          })),
          catchError((error) => of(UserActions.filterUserFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action) =>
        this.userService.addUser(action.data).pipe(
          map((user) => UserActions.addUserSuccess({ user: user.data })),
          catchError((error) => of(UserActions.addUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.data).pipe(
          map((user) => UserActions.updateUserSuccess({ user: user.data })),
          catchError((error) => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map(() => UserActions.deleteUserSuccess({ id: action.id })),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );
}
