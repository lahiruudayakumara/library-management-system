import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from '../../shared/modules/books/books.component';
import { LibrarianLayoutComponent } from './librarian-layout/librarian-layout.component';
import { LibrarianOverviewComponent } from './librarian-overview/librarian-overview.component';
import { MembersComponent } from '../../shared/modules/members/members.component';
import { NgModule } from '@angular/core';
import { UsersComponent } from '../admin/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LibrarianLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: LibrarianOverviewComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrarianRoutingModule { }
