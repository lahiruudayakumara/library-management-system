import * as UserActions from '../../../../store/actions/user.actions';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LucideAngularModule, Users } from 'lucide-angular';
import { selectUserError, selectUserLoading } from '../../../../store/selectors/user.selector';

import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ApiService } from '../../../../core/services/api.service';
import { BarcodeComponent } from '../../barcode/barcode.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss'
})
export class AddUserModalComponent {
  isAlertOpen: boolean = true;
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() addUser = new EventEmitter<void>();
  @Output() errorOccurred = new EventEmitter<string>();

  newMember = {
    name: '',
    email: '',
    password: '',
    username: '',
    role: 'Staff'
  };

  readonly Users = Users;

  constructor(private store: Store) {
    this.store.select(selectUserLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectUserError).subscribe((error) => {
          if (error) {
            this.errorOccurred.emit(error);
            this.isOpen = false;
            this.resetForm();
          } else {
            this.addUser.emit();
            this.onConfirm.emit(true);
            this.isOpen = false;
            this.resetForm();
          }
        });
      }
    });
  }

  handleRegister(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(UserActions.addUser({ data: this.newMember }));

      this.isOpen = false;
      this.resetForm();
    } else {
      form.controls['name'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['password'].markAsTouched();
      form.controls['username'].markAsTouched();
      form.controls['role'].markAsTouched();
    }
  }

  handleCancel() {
    this.onConfirm.emit(false);
    this.isOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newMember = {
      name: '',
      email: '',
      username: '',
      role: 'Staff',
      password: '',
    };
  }
}
