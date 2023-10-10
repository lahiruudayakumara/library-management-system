import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX } from 'lucide-angular';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './action-modal.component.html',
  styleUrl: './action-modal.component.scss',
})
export class ActionModalComponent {
  @Input() isOpen: boolean = false;
  @Input() type: 'info' | 'success' | 'error' | 'warning' = 'info';
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  readonly ShieldQuestion = ShieldQuestion;
  readonly Success = ShieldCheck;
  readonly Error = ShieldX;
  readonly Warning = ShieldAlert;

  handleYes(): void {
    this.onConfirm.emit(true);
    this.isOpen = false;
  }

  handleNo(): void {
    this.onClose.emit();
    this.isOpen = false;
  }
}
