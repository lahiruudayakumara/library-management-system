import * as UserActions from '../../../store/actions/user.actions';

import {
  FilePenLine,
  LucideAngularModule,
  Trash2
} from 'lucide-angular';
import { selectUserError, selectUserLoading, selectUsers } from '../../../store/selectors/user.selector';

import { AddUserModalComponent } from "../modal/add-user-modal/add-user-modal.component";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-list-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AddUserModalComponent],
  templateUrl: './user-list-view.component.html',
  styleUrl: './user-list-view.component.scss',
})
export class UserListViewComponent {
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;
  errorMessage: string = '';
  userRole: string = '';
  isAddUserModal: boolean = false
  isModalOpen: boolean = false;
  isErrorModal: boolean = false;
  isErrorModalOpen: boolean = false;
  users$: Observable<IUser[]> | undefined;
  pagination$: Observable<any> | undefined;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
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
  }

  addUser() {
    this.isAddUserModal = true;
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers({ page: 1, limit: 7 }));
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
}
