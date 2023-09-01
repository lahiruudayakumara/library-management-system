import {
  FilePenLine,
  LucideAngularModule,
  ScanBarcode,
  Search,
  SquarePlus,
  Trash2,
} from 'lucide-angular';

import { AddBookModalComponent } from '../../components/modal/add-book-modal/add-book-modal.component';
import { AlertModalComponent } from "../../components/modal/alert-modal/alert-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { BarcodeScannerComponent } from '../../components/barcode-scanner/barcode-scanner.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditBookModalComponent } from '../../components/modal/edit-book-modal/edit-book-modal.component';
import { FormsModule } from '@angular/forms';
import { IBook } from '../../../interfaces/book';

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
    AlertModalComponent
],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  constructor(private apiService: ApiService) {}
  scanCode: string = '';
  scanEnabled: boolean = false;
  selectedBook: IBook = {} as IBook;

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly ScanBarcode = ScanBarcode;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  isBookDeleteAlertOpen: boolean = false;

  ngOnInit(): void {
    this.loadBooks();
  }

  addBook() {
    this.isModalOpen = !this.isModalOpen;
  }

  editBook(book: any) {
    this.selectedBook = { ...book };
    this.isEditModalOpen = !this.isEditModalOpen;
    console.log('Editing book:', book);
  }

  deleteBook(id: string) {
    this.apiService.deleteBook(id).subscribe({
      next: (data) => {
        if (data.success) {
          this.loadBooks();
        } else {
          console.error('Error deleting book:', data.error);
        }
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      },
    });
    // this.loadBooks();
    this.isBookDeleteAlertOpen = true;
  }

  onCancelEdit() {
    this.isEditModalOpen = false;
  }

  onSaveEdit() {
    this.isEditModalOpen = false;
    this.loadBooks();
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        if (data.success && Array.isArray(data.data)) {
          this.books = data.data;
          this.filteredBooks = [...this.books];
          console.log('Books:', data.data);
        } else {
          this.errorMessage = 'No books found or invalid data format.';
        }
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.errorMessage = 'Error fetching books.';
      },
    });
  }

  scanEnable(): void {
    this.scanEnabled = !this.scanEnabled;
  }

  handleScan(scannedCode: string): void {
    this.scanCode = scannedCode;
    console.log('Scanned ISBN:', scannedCode);
  }

  filterItems(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredBooks = [...this.books];
    } else {
      this.filteredBooks = this.books.filter((item) =>
        item.isbn.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
