import * as UserActions from '../../../../store/actions/user.actions';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../../interfaces/user';
import { Store } from '@ngrx/store';
import { selectMemberError } from '../../../../store/selectors/member.selector';
import { selectUserLoading } from '../../../../store/selectors/user.selector';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss'
})
export class UpdateUserModalComponent {
  isAlertOpen: boolean = true;
  @Input() isOpen: boolean = false;
  @Input() editedUser: IUser = {} as IUser;

  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  readonly Users = Users;

  constructor(private store: Store) {
    this.store.select(selectUserLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectMemberError).subscribe((error) => {
          if (error) {
            this.isOpen = false;
          } else {
            this.isOpen = false;
          }
        });
      }
    });
  }

  handleEdit() {
    this.store.dispatch(UserActions.updateUser({ data: this.editedUser }));
    this.onSave.emit();
  }

  handleCancel() {
    this.onCancel.emit();
  }
}
