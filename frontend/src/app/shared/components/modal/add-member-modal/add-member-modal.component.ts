import * as MemberActions from '../../../../store/actions/member.actions';

import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LucideAngularModule, Users } from 'lucide-angular';
import { selectMemberError, selectMemberLoading } from '../../../../store/selectors/member.selector';

import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-member-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './add-member-modal.component.html',
  styleUrl: './add-member-modal.component.scss'
})

export class AddMemberModalComponent {
  isErrorMessage: boolean = false;
  errorMessage: string = '';

  @Input() isOpen: boolean = false;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() errorOccurred = new EventEmitter<string>();
  @Output() addMember = new EventEmitter<any>();


  newMember = {
    name: '',
    email: '',
    membershipType: 'Basic',
  };

  readonly Users = Users;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.store.select(selectMemberLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectMemberError).subscribe((error) => {
          if (error) {
            this.errorOccurred.emit(error);
            this.isOpen = false;
            this.resetForm();
          } else {
            this.isOpen = false;
            this.resetForm();
          }
        });
      }
    });
  }

  handleRegister(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(MemberActions.registerMember({ data: this.newMember }));

      this.isOpen = false;
      this.resetForm();
    } else {
      form.controls['name'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['membershipType'].markAsTouched();
    }
  }

  handleCancel() {
    this.onClose.emit(false);
    this.isOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newMember = {
      name: '',
      email: '',
      membershipType: 'Basic',
    };
  }
}
