import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX } from 'lucide-angular';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() type: 'info' | 'success' | 'error' | 'warning' = 'info';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'No';

  @Output() onConfirm = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  readonly ShieldQuestion = ShieldQuestion;
  readonly Success = ShieldCheck;
  readonly Error = ShieldX;
  readonly Warning = ShieldAlert;
}
