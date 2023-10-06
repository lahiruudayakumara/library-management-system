import * as UserActions from '../../../store/actions/user.actions';

import {
  FilePenLine,
  LucideAngularModule,
  Search,
  SquarePlus,
  Trash2,
} from 'lucide-angular';
import { selectUserPagination, selectUsers } from '../../../store/selectors/user.selector';

import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user';
import { Observable } from 'rxjs';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-staff-members',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, PaginationComponent, DateFormatPipe],
  templateUrl: './staff-members.component.html',
  styleUrl: './staff-members.component.scss',
})
export class StaffMembersComponent {
  users$: Observable<IUser[]> | undefined;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;
  filteredUsers: IUser[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;
  pagination$: Observable<any> | undefined;

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.pagination$ = this.store.select(selectUserPagination);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.pagination$?.subscribe((pagination) => {
      if (pagination) {
        this.currentPage = pagination.currentPage;
        this.totalItems = pagination.totalItems;
        this.totalPages = pagination.totalPages;
        this.pageSize = pagination.pageSize;
      }
    });
  }

  addUser() {}

  editUser(user: IUser) {
    console.log('Editing user:', user);
  }

  deleteUser(id: string) {
    console.log('Deleting user:', id);
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers({ page: this.currentPage, limit: this.pageSize }));
  }

  filterUsers(): void {
    this.store.dispatch(UserActions.filterUsers({ searchTerm: this.searchTerm, pageSize: this.pageSize, page: this.currentPage }));
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  updatePagination() {
    this.loadUsers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onLimitChange(limit: number) {
    this.pageSize = limit;
    this.currentPage = 1;
    this.updatePagination();
  }
}
