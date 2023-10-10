import * as MemberActions from '../../../store/actions/member.actions';

import { FilePenLine, LucideAngularModule, Trash2 } from 'lucide-angular';
import { selectMemberError, selectMemberLoading, selectMembers } from '../../../store/selectors/member.selector';

import { AddMemberModalComponent } from "../modal/add-member-modal/add-member-modal.component";
import { AlertModalComponent } from "../modal/alert-modal/alert-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { IMember } from '../../../interfaces/member';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-member-list-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AddMemberModalComponent, AlertModalComponent, DateFormatPipe],
  templateUrl: './member-list-view.component.html',
  styleUrl: './member-list-view.component.scss'
})
export class MemberListViewComponent {
  members: IMember[] = [];
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;
  errorMessage: string = '';
  sucessMessage: string = '';
  isAddMemberModal: boolean = false;
  isSucessModal: boolean = false;
  isErrModal: boolean = false;
  userRole: string = '';
  members$: Observable<IMember[]> | undefined;

  constructor(private store: Store) {
    this.members$ = this.store.select(selectMembers);
    this.store.select(selectMemberLoading).subscribe((loading) => {
      if (!loading) {
        this.store.select(selectMemberError).subscribe((error) => {
          if (error) {
            this.isErrModal = true;
            this.errorMessage = error;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  addMember() {
    this.isAddMemberModal = true;
  }

  loadMembers(): void {
    this.store.dispatch(MemberActions.loadMembers({ page: 1, limit: 7 }));
  }

  registerMember() {
    this.isAddMemberModal = false;
    this.isSucessModal = true;
    this.sucessMessage = 'Member added successfully.';
    this.loadMembers();
  }

  handleAlertResponse() {
    this.isErrModal = false;
    this.isSucessModal = false;
  }

  handleError(message: string) {
    this.isErrModal = true;
    this.errorMessage = message;
  }

  closeAddMemberModal() {
    this.isAddMemberModal = false;
  }
}
