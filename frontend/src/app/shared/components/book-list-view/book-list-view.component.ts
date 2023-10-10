import { FilePenLine, LucideAngularModule, Trash2 } from 'lucide-angular';

import { AddBookModalComponent } from "../modal/add-book-modal/add-book-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AddBookModalComponent],
  templateUrl: './book-list-view.component.html',
  styleUrl: './book-list-view.component.scss'
})
export class BookListViewComponent {
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;
  books = [
    { id: 1, name: 'Alice Johnson', bookIssued: 'Book A', department: 'IT' },
    { id: 2, name: 'Bob Smith', bookIssued: 'Book B', department: 'HR' },
    { id: 3, name: 'Charlie Brown', bookIssued: 'Book C', department: 'Finance' },
  ];
  showModal = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void { // Correcting the lifecycle hook
    this.loadBooks();
  }

  addUser() {
    alert('Add New User functionality to be implemented!');
  }

  editUser(user: any) {
    alert(`Edit User: ${user.name}`);
  }

  deleteUser(userId: number) {
    this.books = this.books.filter(user => user.id !== userId);
    alert(`User with ID ${userId} deleted.`);
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Error fetching books:', err),
    });
  }



  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addBook(book: any) {
  }
}
