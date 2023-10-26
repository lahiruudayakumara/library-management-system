import { BookMarked, BookText, Cog, LayoutDashboard, LucideAngularModule, MessageCircle, UserRoundPen, Users } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedStateService } from '../../../core/services/shared-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isStudent = false;
  isLibrarian = false;
  isLibraryAssistant = false;
  isAdmin = false;
  userRole: string = '';

  readonly LayoutDashboard = LayoutDashboard;
  readonly Cog = Cog;
  readonly MessageCircle = MessageCircle;
  readonly Users = Users;
  readonly BookText = BookText;
  readonly BookMarked = BookMarked;
  readonly UserRoundPen = UserRoundPen;
  isActive: boolean = true;

  navList = [
    { icon: LayoutDashboard, name: 'Dashboard', route: 'overview', active: true },
    { icon: Users, name: 'Users', route: 'users', active: false },
    { icon: BookText, name: 'Books', route: 'books', active: false },
    { icon: UserRoundPen, name: 'Members', route: 'members', active: false },
    // { icon: Cog, name: 'Settings', route: 'settings', active: false },
  ]


  constructor(private sharedStateService: SharedStateService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.sharedStateService.classChange$.subscribe((state: boolean) => {
      this.isActive = state;
    });
    this.userRole = this.authService.getRole().toLowerCase();

    if (this.router && this.router.url) {
      this.onChangeRoute(this.router.url.split('/')[2]);
    }
  }

  onChangeRoute(route: string) {
    this.navList.forEach((nav) => {
      nav.active = false;
    });
    const navItem = this.navList.find((nav) => nav.route === route);
    if (navItem) {
      navItem.active = true;
    }
  }
}
