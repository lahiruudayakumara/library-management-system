import {
  FilePenLine,
  LucideAngularModule,
  Search,
  SquarePlus,
  Trash2,
} from 'lucide-angular';

import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-staff-members',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './staff-members.component.html',
  styleUrl: './staff-members.component.scss',
})
export class StaffMembersComponent {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  addUser() {}

  editUser(user: IUser) {
    console.log('Editing user:', user);
  }

  deleteUser(id: string) {
    console.log('Deleting user:', id);
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        if (data.success && Array.isArray(data.data)) {
          this.users = data.data;
          this.filteredUsers = [...this.users];
          console.log('Users:', data.data);
        } else {
          this.errorMessage = 'No users found.';
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.errorMessage = 'Error fetching users.';
      },
    });
  }

  filterUsers(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
