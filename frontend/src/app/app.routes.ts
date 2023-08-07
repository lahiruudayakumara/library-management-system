import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { Role } from './core/models/role.enum';
import { RoleGuard } from './core/guards/role.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'books',
  //   loadChildren: () => import('./features/books/books.module').then((m) => m.BooksModule),
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { role: Role.Librarian },
  // },
  // {
  //   path: 'users',
  //   loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { role: Role.Admin },
  // },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
];
