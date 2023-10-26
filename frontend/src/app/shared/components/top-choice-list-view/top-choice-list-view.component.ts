import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IBook } from '../../../interfaces/book';

@Component({
  selector: 'app-top-choice-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-choice-list-view.component.html',
  styleUrl: './top-choice-list-view.component.scss'
})
export class TopChoiceListViewComponent {
  books: IBook[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.apiService.getBooks(1, 5).subscribe({
      next: (data) => {
        if (data.success && Array.isArray(data.data)) {
          this.books = data.data;
          this.books = [...this.books];
        } else {
          this.errorMessage = 'No books found or invalid data format.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching books.';
      },
    });
  }

}
