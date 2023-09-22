import { Action, createReducer, on } from '@ngrx/store';
import { IBook, IBookState } from '../../interfaces/book';
import {
  addBook,
  addBookFailure,
  addBookSuccess,
  deleteBook,
  deleteBookFailure,
  deleteBookSuccess,
  filterBooks,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  updateBook,
  updateBookFailure,
  updateBookSuccess,
} from '../actions/books.actions';

export const initialState: IBookState = {
  books: [],
  filterBooks: [],
  searchTerm: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0,
    limit: 10,
  },
  loading: false,
  error: null,
};

export const booksReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadBooksSuccess, (state, { books, pagination }) => ({
    ...state,
    books,
    pagination,
    filterBooks: books,
    loading: false,
  })),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addBook, (state) => ({ ...state, loading: true })),
  on(addBookSuccess, (state, { IBook: book }) => ({
    ...state,
    filterBooks: [...state.books, book],
    loading: false,
  })),
  on(addBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateBook, (state) => ({ ...state, loading: true })),
  on(updateBookSuccess, (state, { book }) => ({
    ...state,
    filterBooks: state.books.map((b) =>
      b._id === book._id ? ({ ...book } as unknown as IBook) : b
    ),
    loading: false,
  })),
  on(updateBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteBook, (state) => ({ ...state, loading: true })),
  on(deleteBookSuccess, (state, { BookId }) => ({
    ...state,
    filterBooks: state.books.filter((b) => b._id.toString() !== BookId),
    loading: false,
  })),
  on(deleteBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(filterBooks, (state, { searchTerm }) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    const filterBooks = trimmedSearchTerm
      ? state.books.filter(
          (item) =>
            item.isbn &&
            item.isbn.toString().toLowerCase().includes(trimmedSearchTerm)
        )
      : [...state.books];
    return { ...state, searchTerm, filterBooks };
  })
);
