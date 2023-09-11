import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Info, LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {
  @Input() isOpen: boolean = false; // Controls modal visibility
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<boolean>();

  readonly Info = Info;

  handleYes(): void {
    this.onConfirm.emit(true);
    this.isOpen = false;
  }

  handleNo(): void {
    this.onConfirm.emit(false);
    this.isOpen = false;
  }
}
