import { FilePenLine, LucideAngularModule, Trash2 } from 'lucide-angular';

import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-staff-list-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './staff-list-view.component.html',
  styleUrl: './staff-list-view.component.scss'
})
export class StaffListViewComponent {
  staffUsers: IUser[] = [];
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;
  errorMessage: string = "";
  userRole: string = '';

  constructor(private apiService:ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userRole = this.authService.getRole()
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
    this.apiService.getStaffUsers().subscribe({
      next: (data) => {
        if (data.success) {
          this.staffUsers = data.data;
        } else {
          this.errorMessage = 'No books found or invalid data format.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching books.';
      }
    });

  }

}
