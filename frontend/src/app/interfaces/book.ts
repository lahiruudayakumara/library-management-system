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
