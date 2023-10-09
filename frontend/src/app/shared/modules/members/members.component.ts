import * as MemberActions from '../../../store/actions/member.actions';

import {
  FilePenLine,
  LucideAngularModule,
  Search,
  SquarePlus,
  Trash2,
} from 'lucide-angular';
import { selectMemberError, selectMemberLoading, selectMemberPagination, selectMembers } from '../../../store/selectors/member.selector';

import { ActionModalComponent } from "../../components/modal/action-modal/action-modal.component";
import { AddMemberModalComponent } from "../../components/modal/add-member-modal/add-member-modal.component";
import { AlertModalComponent } from "../../components/modal/alert-modal/alert-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { FormsModule } from '@angular/forms';
import { IMember } from '../../../interfaces/member';
import { Observable } from 'rxjs';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { Store } from '@ngrx/store';
import { UpdateMemberModalComponent } from "../../components/modal/update-member-modal/update-member-modal.component";

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, PaginationComponent, DateFormatPipe, AddMemberModalComponent, ActionModalComponent, UpdateMemberModalComponent, AlertModalComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  members$: Observable<IMember[]> | undefined;
  currentPage = 1;
  limit = 10;
  totalPages = 0;
  totalItems = 0;
  filteredMembers$: Observable<IMember[]> | undefined;
  searchTerm: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;
  isAddMemberModal: boolean = false;
  isSucessModal: boolean = false;
  isErrModal: boolean = false;
  isDeleteMemberModal: boolean = false;
  userRole: string = '';
  sucessMessage: string = '';
  pagination$: Observable<any> | undefined;
  memberId: string = '';

  isEditMemberModal: boolean = false;
  selectedMember: IMember = {} as IMember;

  readonly Search = Search;
  readonly SquarePlus = SquarePlus;
  readonly FilePenLine = FilePenLine;
  readonly Trash2 = Trash2;

  constructor(private store: Store) {
    this.members$ = this.store.select(selectMembers);
    this.pagination$ = this.store.select(selectMemberPagination);
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
    this.loadMember();
    this.filteredMembers$ = this.store.select((state: any) => {
      return state;
    });
    this.pagination$?.subscribe((pagination) => {
      if (pagination) {
        this.currentPage = pagination.currentPage;
        this.totalItems = pagination.totalItems;
        this.totalPages = pagination.totalPages;
        this.limit = pagination.pageSize;
      }
    });
  }

  addMember() {
    this.isAddMemberModal = true;
  }

  editMember(user: any) {
    this.selectedMember = { ...user };
    this.isEditMemberModal = true;
  }

  updateMember() {
    this.isEditMemberModal = false;
    this.isSucessModal = true;
    this.sucessMessage = 'Member updated successfully.';
  }

  deleteMember(id: string) {
    this.isDeleteMemberModal = true;
    this.memberId = id;
  }

  onConfirmDelete() {
    this.store.dispatch(MemberActions.deleteMember({ id: this.memberId }));
    this.loadMember();
    this.isDeleteMemberModal = false;
    this.memberId = '';
    this.isSucessModal = true;
    this.sucessMessage = 'Member deleted successfully.';
  }

  onClose() {
    this.isModalOpen = false;
    this.isDeleteMemberModal = false;
    this.isEditMemberModal = false;
    this.isSucessModal = false;
  }

  loadMember(): void {
    this.store.dispatch(MemberActions.loadMembers({ page: this.currentPage, limit: this.limit }));
  }

  onSearchChange(): void {
    this.store.dispatch(MemberActions.filterMembers({ searchTerm: this.searchTerm , pageSize: this.limit, page: this.currentPage }));
  }

  updatePagination() {
    this.loadMember();
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
    this.limit = limit;
    this.currentPage = 1;
    this.updatePagination();
  }

  registerMember() {
    this.isAddMemberModal = false;
    this.loadMember();
    this.isSucessModal = true;
    this.sucessMessage = 'Member added successfully.';
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
