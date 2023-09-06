import { BookMarked, BookText, Cog, LayoutDashboard, LucideAngularModule, MessageCircle, UserRoundPen, Users } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  isStaff = false;

  readonly LayoutDashboard = LayoutDashboard;
  readonly Cog = Cog;
  readonly MessageCircle = MessageCircle;
  readonly Users = Users;
  readonly BookText = BookText;
  readonly BookMarked = BookMarked;
  readonly UserRoundPen = UserRoundPen;


  logout() {
    // this.authService.logout();
  }

  isActive: boolean = false;

  constructor(private sharedStateService: SharedStateService) {}

  ngOnInit(): void {
    this.sharedStateService.classChange$.subscribe((state: boolean) => {
      this.isActive = state;
    });
  }
}
