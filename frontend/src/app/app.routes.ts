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
    canActivate: [AuthGuard, RoleGuard],
    data: { role: Role.Admin },
  },
  {
    path: 'librarian',
    loadChildren: () => import('./modules/librarian/librarian.module').then((m) => m.LibrarianModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: Role.Librarian },
  },
  {
    path: 'assistant',
    loadChildren: () => import('./modules/assistant/assistant.module').then((m) => m.AssistantModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: Role.Assistant },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
