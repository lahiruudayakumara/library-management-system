import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainContentComponent } from "../../../shared/components/main-content/main-content.component";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { SharedStateService } from '../../../core/services/shared-state.service';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-librarian-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './librarian-layout.component.html',
  styleUrl: './librarian-layout.component.scss'
})
export class LibrarianLayoutComponent {
  isStudent = false;
  isLibrarian = false;
  isLibraryAssistant = false;
  isStaff = false;

  logout() {
    // this.authService.logout();
  }

  isActive: boolean = false;

  constructor(private sharedStateService: SharedStateService) { }

  ngOnInit(): void {
    this.sharedStateService.classChange$.subscribe((state: boolean) => {
      this.isActive = state;
    });
  }
}
