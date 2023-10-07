import { RouterModule, Routes } from '@angular/router';

import { AssistantLayoutComponent } from './assistant-layout/assistant-layout.component';
import { AssistantOverviewComponent } from './assistant-overview/assistant-overview.component';
import { BooksComponent } from '../../shared/modules/books/books.component';
import { MembersComponent } from '../../shared/modules/members/members.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AssistantLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: AssistantOverviewComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantRoutingModule { }
