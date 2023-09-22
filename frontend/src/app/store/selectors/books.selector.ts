import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBookState } from '../../interfaces/book';

export const selectBooksState = createFeatureSelector<IBookState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  (state) => state.filterBooks
);

export const selectLoading = createSelector(
  selectBooksState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectBooksState,
  (state) => state.error
);

export const selectPagination = createSelector(
  selectBooksState,
  (state) => state.pagination
);
