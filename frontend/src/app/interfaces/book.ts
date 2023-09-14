export interface IBook {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  genres: string[];
  description?: string;
  publishedDate: string;
  availableCopies: number;
  totalCopies: number;
  addedBy: string;
  updatedBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalBooks: number;
  limit: number;
}

export interface IBookState {
  books: IBook[];
  searchTerm: string;
  filterBooks: IBook[];
  pagination: IPagination;
  loading: boolean;
  error: string | null;
}

export interface IAddBook {
  title: string;
  author: string;
  isbn: string;
  genresString: string;
  description: string;
  publishedDate: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: string;
  updatedBy: string;
  isActive: boolean;
}
