import * as AuthActions from '../actions/auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private authService: AuthService = inject(AuthService);
  actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(
        (action: { credentials: { username: string; password: string } }) =>
          this.authService.login(action.credentials).pipe(
            map((response) => AuthActions.loginSuccess({ user: response })),
            catchError((error) =>(
              of(
                AuthActions.loginFailure({
                  error: error.error || 'Login failed',
                })
              ))
            )
          )
      )
    )
  );
}
