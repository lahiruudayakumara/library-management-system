import { FilePenLine, LucideAngularModule, Trash2 } from 'lucide-angular';

import { ActionModalComponent } from "../modal/action-modal/action-modal.component";
import { AddMemberModalComponent } from "../modal/add-member-modal/add-member-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IMember } from '../../../interfaces/member';

@Component({
  selector: 'app-member-list-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AddMemberModalComponent, ActionModalComponent],
  templateUrl: './member-list-view.component.html',
  styleUrl: './member-list-view.component.scss'
})
export class MemberListViewComponent {
  members: IMember[] = [];
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;
  errorMessage: string = '';
  isAddMemberModal: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  addMember() {
    this.isAddMemberModal = true;
  }

  editMember(user: any) {
    alert(`Edit User: ${user.name}`);
  }

  deleteMember(userId: string) {
    // this.users = this.users.filter(user => user.id !== userId);
    alert(`User with ID ${userId} deleted.`);
  }

  loadMembers(): void {
    this.apiService.getMembers().subscribe({
      next: (data) => {
        if (data.success) {
          this.members = data.data;
        } else {
          this.errorMessage = 'No members found or invalid data format.';
        }
      },
      error: (err) => {
        console.error('Error fetching members:', err);
        this.errorMessage = 'Error fetching members.';
      },
    });
  }

  registerMember() {
    // this.isAddMemberModal = false;
  }
}
