import { Component, Input } from '@angular/core';
import { LucideAngularModule, ShieldCheck, ShieldX } from 'lucide-angular';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-box',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './view-box.component.html',
  styleUrl: './view-box.component.scss'
})
export class ViewBoxComponent {
  @Input() count: number = 0; // Accept the count as a prop
  @Input() icon: any; // Accept the Lucide icon name as a prop
  @Input() description: string = '';
  @Input() active?: number = 0;
  @Input() inactive?: number = 0;

  readonly ShieldCheck = ShieldCheck;
  readonly ShieldX = ShieldX;
}
