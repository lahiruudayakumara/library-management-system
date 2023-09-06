import { AlignJustify, Bell, LayoutDashboard, LogOut, LucideAngularModule } from 'lucide-angular';
import { Component, OnInit } from '@angular/core';

import { ActionModalComponent } from "../modal/action-modal/action-modal.component";
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedStateService } from '../../../core/services/shared-state.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

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
  readonly LayoutDashboard = LayoutDashboard;
  readonly Bell = Bell;
  readonly LogOut = LogOut;
  readonly AlignJustify = AlignJustify;
  isActive: boolean = false;
  isModalOpen: boolean = false;

  constructor(private authService: AuthService, private sharedStateService: SharedStateService) {}

  ngOnInit(): void {
    // const userRole = this.authService.getRole(); // Replace with your role fetching logic
    // this.isStudent = userRole === 'Student';
    // this.isLibrarian = userRole === 'librarian';
    // this.isLibraryAssistant = userRole === 'assistant';
    // this.isStaff = userRole === 'staff';
  }

  logout() {
    this.isModalOpen = true;
  }

  changeSideBar(): void {
    this.isActive = !this.isActive;
    this.sharedStateService.toggleClass(this.isActive);
  }

  showNotifications = false;
  notifications = ['New message received', 'Your report is ready', 'New comment on your post'];

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  openLogoutModal(): void {
    this.isModalOpen = true;
  }

  handleLogoutResponse(response: boolean): void {
    if (response) {
      console.log('Logging out...');
      localStorage.clear();
    } else {
      this.isModalOpen = false;
      console.log('Logout cancelled.');
    }
  }
}
