import * as MemberActions from '../../../../store/actions/member.actions';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { selectMemberError, selectMemberLoading } from '../../../../store/selectors/member.selector';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IMember } from '../../../../interfaces/member';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-member-modal',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './update-member-modal.component.html',
  styleUrl: './update-member-modal.component.scss'
})
export class UpdateMemberModalComponent {
  isAlertOpen: boolean = true;
  @Input() isOpen: boolean = false;
  @Input() editedMember: IMember = {} as IMember;

  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  readonly Users = User;

  constructor(private store: Store) {
    this.store.select(selectMemberLoading).subscribe((loading) => {
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
    this.store.dispatch(MemberActions.updateMember({ data: this.editedMember }));
    this.onSave.emit();
  }

  handleCancel() {
    this.onCancel.emit()
  }
}
