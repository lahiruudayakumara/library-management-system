import { BookText, LucideAngularModule } from 'lucide-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../../../../interfaces/book';

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

  constructor(private apiService: ApiService) { }

  handleEdit() {
    this.apiService.updateBook(this.editedBook).subscribe({
      next: (data) => {
        if (data.success) {
          // this.onSave.emit(data.data);
          console.log(data.data);
        } else {
          console.error('Error updating book:', data.error);
        }
      },
      error: (err) => {
        console.error('Error updating book:', err);
      }
    });
    this.onSave.emit();
  }

  handleCancel() {
    this.onCancel.emit(); // Emit cancel event
    console.log(this.editedBook);
  }

  getFormattedPublishedDate(): string {
    const date = this.editedBook.publishedDate;
    return date ? date.toString().split('T')[0] : ''; // Formats date as 'YYYY-MM-DD'
  }

  setFormattedPublishedDate(dateString: string): void {
    this.editedBook.publishedDate = new Date(dateString).toISOString(); // Converts back to ISO string
  }
}
