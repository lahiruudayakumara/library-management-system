import { IAddBook, IBook, IPagination } from '../../interfaces/book';
import { createAction, props } from '@ngrx/store';

export const loadBooks = createAction(
  '[Books] Load Books',
  props<{ page: number; limit: number }>()
);

export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: IBook[]; filterBooks: IBook[], pagination: IPagination }>()
);

export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: string }>()
);

export const addBook = createAction(
  '[IBooks] Add IBook',
  props<{ Book: IAddBook }>()
);

export const addBookSuccess = createAction(
  '[IBooks] Add IBook Success',
  props<{ IBook: IBook }>()
);

export const addBookFailure = createAction(
  '[IBooks] Add IBook Failure',
  props<{ error: any }>()
);

export const filterBooks = createAction(
  '[Books] Filter Books',
  props<{ searchTerm: string; page: number; limit: number }>()
);

export const filterBooksSuccess = createAction(
  '[Books] Filter Books Success',
  props<{ filterBooks: IBook[]; pagination: IPagination }>()
);

export const filterBooksFailure = createAction(
  '[Books] Filter Books Failure',
  props<{ error: any }>()
);

export const updateBook = createAction(
  '[IBooks] Update IBook',
  props<{ book: IBook }>()
);

export const updateBookSuccess = createAction(
  '[IBooks] Update IBook Success',
  props<{ book: IBook }>()
);

export const updateBookFailure = createAction(
  '[IBooks] Update IBook Failure',
  props<{ error: any }>()
);

export const deleteBook = createAction(
  '[IBooks] Delete IBook',
  props<{ BookId: string }>()
);

export const deleteBookSuccess = createAction(
  '[IBooks] Delete IBook Success',
  props<{ BookId: string }>()
);

export const deleteBookFailure = createAction(
  '[IBooks] Delete IBook Failure',
  props<{ error: any }>()
);
