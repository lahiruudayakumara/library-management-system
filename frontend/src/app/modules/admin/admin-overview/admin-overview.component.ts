import { BookMarked, BookText, LayoutDashboard, UserPen, Users } from 'lucide-angular';

import { AddMemberModalComponent } from "../../../shared/components/modal/add-member-modal/add-member-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { BookListViewComponent } from "../../../shared/components/book-list-view/book-list-view.component";
import { Component } from '@angular/core';
import { MemberListViewComponent } from "../../../shared/components/member-list-view/member-list-view.component";
import { StaffListViewComponent } from "../../../shared/components/staff-list-view/staff-list-view.component";
import { TopChoiceListViewComponent } from "../../../shared/components/top-choice-list-view/top-choice-list-view.component";
import { UserCount } from '../../../interfaces/user';
import { UserListViewComponent } from "../../../shared/components/user-list-view/user-list-view.component";
import { ViewBoxComponent } from "../../../shared/components/view-box/view-box.component";
import { WelcomeDateTimeComponentComponent } from "../../../shared/components/welcome-date-time-component/welcome-date-time-component.component";

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  imports: [WelcomeDateTimeComponentComponent, ViewBoxComponent, UserListViewComponent, BookListViewComponent, TopChoiceListViewComponent, StaffListViewComponent, MemberListViewComponent, AddMemberModalComponent],
  templateUrl: './admin-overview.component.html',
  styleUrl: './admin-overview.component.scss'
})

export class AdminOverviewComponent {
  isAddModalOpen: boolean = true;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly UserPen = UserPen;
  readonly BookText = BookText;
  readonly BookMarked = BookMarked;

  userCount: UserCount = {} as UserCount;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUserCount();
    this.loadBooks();
    this.loadStaff();
  }

  loadUserCount(): void {
    this.apiService.getUsersCount('Librarian').subscribe({
      next: (data) => {
        if (data.success) {
          console.log('Users:', data.data);
          this.userCount = data.data;
        } else {
          console.error('Error fetching users:', data);
        }
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        if (data.success && Array.isArray(data.data)) {
          console.log('Books:', data.data);
        } else {
          console.error('Error fetching books:', data);
        }
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  loadStaff(): void {
    // this.apiService.getStaff().subscribe({
    //   next: (data) => {
    //     if (data.success && Array.isArray(data.data)) {
    //       console.log('Staff:', data.data);
    //     } else {
    //       console.error('Error fetching staff:', data);
    //     }
    //   },
    //   error: (err) => console.error('Error fetching staff:', err),
    // });
  }
}
