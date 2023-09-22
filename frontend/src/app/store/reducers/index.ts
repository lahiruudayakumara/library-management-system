// reducers/index.ts

import { BooksState, booksReducer } from './books.reducer';

import { ActionReducerMap } from '@ngrx/store';

// import { AuthState } from './auth.reducer';



export interface AppState {
  // auth: AuthState;
  books: BooksState;
}

export const appReducers: ActionReducerMap<AppState> = {
  // auth: authReducer,
  books: booksReducer,
};
