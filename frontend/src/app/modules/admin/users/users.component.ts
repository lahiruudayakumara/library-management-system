import * as UserActions from '../../../store/actions/user.actions';

import { FilePenLine, LucideAngularModule, Search, SquarePlus, Trash2 } from 'lucide-angular';
import { selectUserError, selectUserLoading, selectUserPagination, selectUsers } from '../../../store/selectors/user.selector';

import { ActionModalComponent } from "../../../shared/components/modal/action-modal/action-modal.component";
import { AddMemberModalComponent } from "../../../shared/components/modal/add-member-modal/add-member-modal.component";
import { AddUserModalComponent } from "../../../shared/components/modal/add-user-modal/add-user-modal.component";
import { AlertModalComponent } from "../../../shared/components/modal/alert-modal/alert-modal.component";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditBookModalComponent } from "../../../shared/components/modal/edit-book-modal/edit-book-modal.component";
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../interfaces/user';
import { Observable } from 'rxjs';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PrintBarcodeModalComponent } from "../../../shared/components/modal/print-barcode-modal/print-barcode-modal.component";
import { Store } from '@ngrx/store';
import { UpdateUserModalComponent } from "../../../shared/components/modal/update-user-modal/update-user-modal.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, AddMemberModalComponent, PaginationComponent, AddUserModalComponent, EditBookModalComponent, AlertModalComponent, ActionModalComponent, PrintBarcodeModalComponent, UpdateUserModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users$: Observable<IUser[]> | undefined;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;
  filteredUsers: IUser[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;
  isAddUserModal: boolean = false;
  pagination$: Observable<any> | undefined;
  userId: string = '';
  isErrorModal: boolean = false;
  isErrorModalOpen: boolean = false;
  selectedUser: IUser = {} as IUser;
  warningMessage: string = '';
  isBookDeleteAlertOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isSucessModal: boolean = false;

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.pagination$ = this.store.select(selectUserPagination);
    this.store.select(selectUserLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectUserError).subscribe((error) => {
          if (error) {
            this.isErrorModalOpen = true;
            this.errorMessage = error;
          }
        });
      }
    });
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

  addUser() {
    this.isAddUserModal = true;
  }

  editUser(user: IUser) {
    this.selectedUser = { ...user };
    this.isEditModalOpen = true;
  }

  deleteUser(id: string) {
    this.userId = id;
    this.warningMessage = 'Are you sure you want to delete this book?';
    this.isBookDeleteAlertOpen = true;
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers({ page: this.currentPage, limit: this.pageSize }));
  }

  filterUsers(): void {
    this.store.dispatch(UserActions.filterUsers({ page: this.currentPage, pageSize: this.pageSize, searchTerm: this.searchTerm }));
  }

  onClose() {
    this.isSucessModal = false;
    this.isModalOpen = false;
    this.isEditModalOpen = false;
    this.isErrorModalOpen = false;
    this.isBookDeleteAlertOpen = false;
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

  registerUser() {
    this.isAddUserModal = false;
    this.loadUsers();
  }

  handleError(message: any) {
    this.isErrorModal = true;
    this.errorMessage = message;
    this.isModalOpen = false;
  }

  closeUserModal() {
    this.isModalOpen = false;
  }

  handleErrorModel() {
    this.isErrorModalOpen = false;
    this.isAddUserModal = false;
  }

  onConfirmDelete() {
    this.store.dispatch(UserActions.deleteUser({ id: this.userId }));
    this.store.dispatch(UserActions.loadUsers({ page: this.currentPage, limit: this.pageSize }));
    this.isBookDeleteAlertOpen = false;
  }

  onCancelEdit() {
    this.isEditModalOpen = false;
  }

  onSaveEdit() {
    this.isEditModalOpen = false;
    this.loadUsers();
  }
}
