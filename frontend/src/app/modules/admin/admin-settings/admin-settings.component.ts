import { LucideAngularModule, UserRoundCog } from 'lucide-angular';

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss'
})
export class AdminSettingsComponent {
  readonly UserRoundCog = UserRoundCog;

}
