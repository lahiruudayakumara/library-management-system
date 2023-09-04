import {
  FilePenLine,
  LucideAngularModule,
  Trash,
  Trash2,
} from 'lucide-angular';

import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-user-list-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './user-list-view.component.html',
  styleUrl: './user-list-view.component.scss',
})
export class UserListViewComponent {
  users: IUser[] = [];
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  addUser() {
    alert('Add New User functionality to be implemented!');
  }

  editUser(user: any) {
    alert(`Edit User: ${user.name}`);
  }

  deleteUser(userId: string) {
    // this.users = this.users.filter(user => user.id !== userId);
    alert(`User with ID ${userId} deleted.`);
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        if (data.success) {
          this.users = data.data;
          console.log('Books:', data);
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
}
