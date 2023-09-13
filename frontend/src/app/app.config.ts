import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';

import { ApplicationConfig } from '@angular/core';
import { AuthEffects } from './store/effects/auth.effects';
import { BooksEffects } from './store/effects/book.effects';
import { MemberEffects } from './store/effects/member.effect';
import { UserEffects } from './store/effects/user.effects';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { authReducer } from './store/reducers/auth.reducer';
import { booksReducer } from './store/reducers/books.reducer';
import { memberReducer } from './store/reducers/member.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { userReducer } from './store/reducers/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideEffects(),
    provideState('books', booksReducer),
    provideState('members', memberReducer),
    provideState('users', userReducer),
    provideState('auth', authReducer),
    provideEffects(UserEffects),
    provideEffects(MemberEffects),
    provideEffects(BooksEffects),
    provideEffects(AuthEffects)
  ]
};
