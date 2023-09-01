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
import { IMember } from '../../../interfaces/member';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  members: IMember[] = [];
  filteredMembers: IMember[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMember();
  }

  addMember() {}

  editMember(user: any) {
    console.log('Editing user:', user);
  }

  deleteMember(id: string) {
    console.log('Deleting user:', id);
  }

  loadMember(): void {
    this.apiService.getMembers().subscribe({
      next: (data: any) => {
        if (data.success && Array.isArray(data.data)) {
          this.members = data.data;
          this.filteredMembers = [...this.members];
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

  filterMember(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMembers = [...this.members];
    } else {
      this.filteredMembers = this.members.filter((member) =>
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
