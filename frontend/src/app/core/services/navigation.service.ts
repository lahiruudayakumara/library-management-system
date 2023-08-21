import { Injectable } from '@angular/core';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  getNavigation(role: Role): { label: string; route: string }[] {
    switch (role) {
      case Role.Admin:
        return [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Manage Users', route: '/users' },
        ];
      case Role.Librarian:
        return [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Manage Books', route: '/books' },
        ];
      case Role.Student:
        return [{ label: 'My Books', route: '/books/my-books' }];
      default:
        return [];
    }
  }
}
