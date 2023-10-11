import * as BooksActions from '../../../../store/actions/books.actions';

import { BookText, LucideAngularModule } from 'lucide-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  selectError,
  selectLoading,
} from '../../../../store/selectors/books.selector';

import { ApiService } from '../../../../core/services/api.service';
import { BarcodeComponent } from '../../barcode/barcode.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, BarcodeComponent],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.scss',
})
export class AddBookModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<boolean>();

  @Output() closeModal = new EventEmitter<void>();
  @Output() addBook = new EventEmitter<any>();
  @Output() errorOccurred = new EventEmitter<string>();

  newBook = {
    title: '',
    author: '',
    isbn: '',
    genresString: '',
    description: '',
    publishedDate: '',
    totalCopies: 1,
    availableCopies: 1,
    addedBy: '607e1f8b8bcb8e3f74158a32',
    updatedBy: '607e1f8b8bcb8e3f74158a32',
    isActive: true,
  };

  readonly BookText = BookText;

  constructor(private store: Store) {
    this.store.select(selectLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectError).subscribe((error) => {
          if (error) {
            this.errorOccurred.emit(error);
            this.isOpen = false;
            this.resetForm();
          } else {
            this.addBook.emit({ isbn: this.newBook.isbn });
            this.onConfirm.emit(true);
            this.isOpen = false;
            this.resetForm();
          }
        });
      }
    });
  }

  handleYes(): void {
    if (this.newBook.title && this.newBook.author && this.newBook.isbn) {
      this.store.dispatch(BooksActions.addBook({ Book: this.newBook }));
    }
  }

  handleNo(): void {
    this.closeModal.emit();
    this.isOpen = false;
    this.resetForm();
  }

  private resetForm() {
    this.newBook = {
      title: '',
      author: '',
      isbn: '',
      genresString: '',
      description: '',
      publishedDate: '',
      totalCopies: 1,
      availableCopies: 1,
      addedBy: '607e1f8b8bcb8e3f74158a32',
      updatedBy: '607e1f8b8bcb8e3f74158a32',
      isActive: true,
    };
  }
}
