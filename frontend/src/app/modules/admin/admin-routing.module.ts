import { RouterModule, Routes } from '@angular/router';

import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { BooksComponent } from '../../shared/modules/books/books.component';
import { MembersComponent } from '../../shared/modules/members/members.component';
import { NgModule } from '@angular/core';
import { StaffMembersComponent } from './staff-members/staff-members.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: AdminOverviewComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      // {
      //   path: 'chat',
      //   component: AdminChatComponent,
      // },
      {
        path: 'Settings',
        component: AdminSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
