import * as AuthActions from '../../../store/actions/auth.actions';

import { selectAuthError, selectAuthLoading } from '../../../store/selectors/auth.selectors';

import { AlertModalComponent } from '../../../shared/components/modal/alert-modal/alert-modal.component';
import { Component } from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  errModal: boolean = false;

  constructor(private store: Store) {
    this.store.select(selectAuthError).subscribe((error) => (
      this.errorMessage = error ?? '',
      this.errModal = !!error
    ));
    this.store.select(selectAuthLoading).subscribe((loading) => (this.loading = loading));
  }

  login() {
    if (this.username && this.password) {
      this.store.dispatch(AuthActions.login({ credentials: { username: this.username, password: this.password } }));
    } else {
      this.errorMessage = 'Please fill in both fields.';
      this.errModal = true;
    }
  }

  handleConfirm() {
    this.errModal = false;
  }
}
