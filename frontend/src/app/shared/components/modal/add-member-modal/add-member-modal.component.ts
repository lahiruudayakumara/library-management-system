import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';

import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ApiService } from '../../../../core/services/api.service';
import { BarcodeComponent } from '../../barcode/barcode.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-member-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, AlertModalComponent],
  templateUrl: './add-member-modal.component.html',
  styleUrl: './add-member-modal.component.scss'
})
export class AddMemberModalComponent {
  isAlertOpen: boolean = false;
  @Input() isOpen: boolean = false;

  @Output() onConfirm = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() addMember = new EventEmitter<any>();

  newMember = {
    name: '',
    email: '',
    membershipType: 'Basic',
  };

  readonly Users = Users;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  handleRegister() {
    this.apiService.registerMember(this.newMember).subscribe({
      next: (data) => {
        if (data.success) {
          this.isAlertOpen = true;
          this.addMember.emit(data.data);
          this.cdr.detectChanges();
        } else {
          console.error('Error adding member:', data.error);
        }
      },
      error: (err) => {
        console.error('Error adding member:', err);
        this.isAlertOpen = true;
      }
    });
    this.onConfirm.emit(true);
    this.isOpen = false;
  }

  handleCancel() {
    this.onConfirm.emit(false);
    this.isOpen = false;
    this.resetForm();
    this.isAlertOpen = true;
  }

  resetForm() {
    this.newMember = {
      name: '',
      email: '',
      membershipType: '',
    };
  }
}
