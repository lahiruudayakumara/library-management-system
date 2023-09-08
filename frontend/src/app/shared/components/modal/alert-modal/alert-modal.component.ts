import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirm';
  @Input() type: 'info' | 'success' | 'error' | 'warning' = 'info';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>(); // Event to notify the parent when the modal is closed

  readonly ShieldQuestion = ShieldQuestion;
  readonly Success = ShieldCheck;
  readonly Error = ShieldX;
  readonly Warning = ShieldAlert;

  handleConfirm(): void {
    this.onConfirm.emit();
    this.isOpen = false;
    this.onClose.emit(); // Emit to parent component when modal closes
  }
}
