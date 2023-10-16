import * as BooksActions from '../../../store/actions/books.actions';

import { Component, OnInit } from '@angular/core';
import {
  FilePenLine,
  LucideAngularModule,
  ScanBarcode,
  Search,
  SquarePlus,
  Trash2,
} from 'lucide-angular';
import { Store, select } from '@ngrx/store';
import { selectAllBooks, selectError, selectLoading, selectPagination } from '../../../store/selectors/books.selector';

import { ActionModalComponent } from "../../components/modal/action-modal/action-modal.component";
import { AddBookModalComponent } from '../../components/modal/add-book-modal/add-book-modal.component';
import { AlertModalComponent } from '../../components/modal/alert-modal/alert-modal.component';
import { ApiService } from '../../../core/services/api.service';
import { BarcodeScannerComponent } from '../../components/barcode-scanner/barcode-scanner.component';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { EditBookModalComponent } from '../../components/modal/edit-book-modal/edit-book-modal.component';
import { FormsModule } from '@angular/forms';
import { IBook } from '../../../interfaces/book';
import { Observable } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PrintBarcodeModalComponent } from '../../components/modal/print-barcode-modal/print-barcode-modal.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    AddBookModalComponent,
    BarcodeScannerComponent,
    LucideAngularModule,
    FormsModule,
    EditBookModalComponent,
    AlertModalComponent,
    DateFormatPipe,
    PaginationComponent,
    PrintBarcodeModalComponent,
    ActionModalComponent
],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  books$: Observable<IBook[]> | undefined;
  pagination$: Observable<any> | undefined;
  filteredBooks$: Observable<IBook[]> | undefined;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;
  limit = 10;
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  scanCode: string = '';
  scanEnabled: boolean = false;
  selectedBook: IBook = {} as IBook;
  isSucessModal: boolean = false;
  barcode: string = 'asd';
  isErrorModalOpen: boolean = false;
  count$: Observable<number> | undefined;
  loading$: Observable<boolean> | undefined;
  warningMessage: string = '';
  bookId: string = '';

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly ScanBarcode = ScanBarcode;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  isBookDeleteAlertOpen: boolean = false;

  constructor(private apiService: ApiService, private store: Store) {
    this.filteredBooks$ = this.store.select(selectAllBooks);
    this.pagination$ = this.store.select(selectPagination);
    this.loading$ = this.store.select(selectLoading);
    this.store.select(selectError).subscribe((error) => {
      if (error) {
        this.errorMessage = error;
        this.isErrorModalOpen = true;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks({ page: this.currentPage, limit: this.pageSize }));
    this.pagination$?.subscribe((pagination) => {
      if (pagination) {
        this.currentPage = pagination.currentPage;
        this.totalItems = pagination.totalBooks;
        this.totalPages = pagination.totalPages;
        this.limit = pagination.limit;
      }
    });
  }

  addBook() {
    this.isModalOpen = true;
  }

  editBook(book: any) {
    this.selectedBook = { ...book };
    this.isEditModalOpen = true;
  }

  deleteBook(id: string) {
    this.bookId = id;
    this.warningMessage = 'Are you sure you want to delete this book?';
    this.isBookDeleteAlertOpen = true;
  }

  onConfirmDelete() {
    this.store.dispatch(BooksActions.deleteBook({ BookId: this.bookId }));
    this.store.dispatch(BooksActions.loadBooks({ page: this.currentPage, limit: this.pageSize }));
    this.isBookDeleteAlertOpen = false;
  }

  onCancelEdit() {
    this.isEditModalOpen = false;
  }

  onSaveEdit() {
    this.isEditModalOpen = false;
    this.loadBooks();
  }

  loadBooks(): void {
    this.store.dispatch(BooksActions.loadBooks({ page: this.currentPage, limit: this.pageSize }));
  }

  scanEnable(): void {
    this.scanEnabled = !this.scanEnabled;
  }

  handleScan(scannedCode: string): void {
    this.scanCode = scannedCode;
  }

  filterItems(): void {
    this.store.dispatch(BooksActions.filterBooks({ page: this.currentPage, limit: this.pageSize, searchTerm: this.searchTerm }));
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  updatePagination() {
    this.loadBooks();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onLimitChange(limit: number) {
    this.pageSize = limit;
    this.currentPage = 1;
    this.updatePagination();
  }

  onClose() {
    this.isSucessModal = false;
    this.isModalOpen = false;
    this.isEditModalOpen = false;
    this.isErrorModalOpen = false;
    this.isBookDeleteAlertOpen = false;
  }

  handleprint() {
    this.printBarcode();
  }

  addBookSucess(event: any) {
    this.barcode = event.isbn;
    if (event.isbn !== '') {
      this.store.dispatch(BooksActions.loadBooks({ page: this.currentPage, limit: this.pageSize }));
      this.isSucessModal = true;
    }
  }

  printBarcode() {
    const barcodeElement = document.querySelector('#barcode') as HTMLElement;
    const newWindow = window.open('', '_blank');
    if (newWindow && barcodeElement) {
      newWindow.document.write(`
        <html>
          <head><title>Print Barcode</title></head>
          <body>${barcodeElement.outerHTML}</body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  }

  errorOccurred(event: any) {
    this.errorMessage = event;
    this.isErrorModalOpen = true;
  }

  handleErrorModel() {
    this.isErrorModalOpen = false;
    this.isModalOpen = false;
  }
}
