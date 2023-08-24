import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainContentComponent } from "../../../shared/components/main-content/main-content.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { SharedStateService } from '../../../core/services/shared-state.service';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
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
