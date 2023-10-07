import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SharedStateService } from '../../../core/services/shared-state.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-assistant-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './assistant-layout.component.html',
  styleUrl: './assistant-layout.component.scss'
})
export class AssistantLayoutComponent {
  isStudent = false;
  isLibrarian = false;
  isLibraryAssistant = false;
  isStaff = false;

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
