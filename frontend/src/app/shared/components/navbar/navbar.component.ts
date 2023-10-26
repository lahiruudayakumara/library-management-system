import { AlignJustify, Bell, LayoutDashboard, LogOut, LucideAngularModule, X } from 'lucide-angular';
import { Component, OnInit } from '@angular/core';

import { ActionModalComponent } from "../modal/action-modal/action-modal.component";
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedStateService } from '../../../core/services/shared-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ActionModalComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isStudent = false;
  isLibrarian = false;
  isLibraryAssistant = false;
  isStaff = false;
  isActive: boolean = false;
  isModalOpen: boolean = false;
  showNotifications = false;

  readonly LayoutDashboard = LayoutDashboard;
  readonly Bell = Bell;
  readonly LogOut = LogOut;
  readonly AlignJustify = AlignJustify;
  readonly X = X;

  notifications = ['New message received', 'Your report is ready', 'New comment on your post'];

  constructor(private authService: AuthService, private sharedStateService: SharedStateService) {}

  ngOnInit(): void {}

  logout() {
    this.isModalOpen = true;
  }

  changeSideBar(): void {
    this.isActive = !this.isActive;
    this.sharedStateService.toggleClass(this.isActive);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  openLogoutModal(): void {
    this.isModalOpen = true;
  }

  handleLogoutResponse(response: boolean): void {
    if (response) {
      this.authService.logout();
    } else {
      this.isModalOpen = false;
    }
  }
}
