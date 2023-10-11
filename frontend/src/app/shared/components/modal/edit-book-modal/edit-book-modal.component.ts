import * as BooksActions from '../../../../store/actions/books.actions';

import { BookText, LucideAngularModule } from 'lucide-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectError, selectLoading } from '../../../../store/selectors/books.selector';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../../../../interfaces/book';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-book-modal',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrl: './edit-book-modal.component.scss',
})
export class EditBookModalComponent {
  @Input() isOpen: boolean = false; // Controls modal visibility
  @Input() editedBook: IBook = {} as IBook;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  readonly BookText = BookText;

  constructor(private store: Store) {
    this.store.select(selectLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectError).subscribe((error) => {
          if (error) {
            this.isOpen = false;
          } else {
            this.isOpen = false;
          }
        });
      }
    });

  }

  handleEdit() {
    this.store.dispatch(BooksActions.updateBook({ book: this.editedBook }));
    this.onSave.emit();
  }

  handleCancel() {
    this.onCancel.emit();
  }

  getFormattedPublishedDate(): string {
    const date = this.editedBook.publishedDate;
    return date ? date.toString().split('T')[0] : ''; // Formats date as 'YYYY-MM-DD'
  }

  setFormattedPublishedDate(dateString: string): void {
    this.editedBook.publishedDate = new Date(dateString).toISOString(); // Converts back to ISO string
  }
}
