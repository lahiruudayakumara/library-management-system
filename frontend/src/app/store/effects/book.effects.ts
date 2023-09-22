// store/effects/books.effects.ts

import * as BooksActions from '../actions/books.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService } from '../../core/services/api.service';
import { IBook } from '../../interfaces/book';
import { of } from 'rxjs';

@Injectable()
export class BooksEffects {
  private apiService: ApiService = inject(ApiService);
  actions$ = inject(Actions);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      mergeMap(({ page, limit }) =>
        this.apiService.getBooks(page, limit).pipe(
          map((response) =>
            BooksActions.loadBooksSuccess({
              books: response.data,
              filterBooks: response.data,
              pagination: response.pagination,
            })
          ),
          catchError(
            (error) => (
              of(BooksActions.loadBooksFailure({ error: error.message }))
            )
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.addBook),
      switchMap(({ Book }) =>
        this.apiService.addBook(Book).pipe(
          map((newBook) => BooksActions.addBookSuccess({ IBook: newBook.data })),
          catchError((error) => {
            return of(
              BooksActions.addBookFailure({
                error: error.status === 400 ? 'Book already exists' : error.message,
              })
            );
          })
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.updateBook),
      mergeMap(({ book }) =>
        this.apiService.updateBook(book).pipe(
          map((updatedBook: IBook) =>
            BooksActions.updateBookSuccess({ book: updatedBook })
          ),
          catchError((error) =>
            of(BooksActions.updateBookFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.deleteBook),
      mergeMap(({ BookId }) =>
        this.apiService.deleteBook(BookId).pipe(
          map(() => BooksActions.deleteBookSuccess({ BookId })),
          catchError((error) =>
            of(BooksActions.deleteBookFailure({ error: error.message }))
          )
        )
      )
    )
  );

  filterBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.filterBooks),
      mergeMap(({ searchTerm, page, limit }) =>
        this.apiService.filterBooks(searchTerm, page, limit).pipe(
          map((response) =>
            BooksActions.filterBooksSuccess({
              filterBooks : response.data,
              pagination: {
                currentPage: page,
                totalPages: response.data.length / limit,
                totalBooks: response.data.length,
                limit,
              }
            })
          ),
          catchError((error) =>
            of(BooksActions.loadBooksFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
