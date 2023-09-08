import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';

import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ApiService } from '../../../../core/services/api.service';
import { BarcodeComponent } from '../../barcode/barcode.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, AlertModalComponent],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss'
})
export class AddUserModalComponent {
  isAlertOpen: boolean = true;
  @Input() isOpen: boolean = false; // Controls modal visibility
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() addMember = new EventEmitter<any>();

  newMember = {
    name: '',
    email: '',
    membershipType: '',
  };

  readonly Users = Users;

  constructor(private apiService: ApiService) {}

  handleRegister() {
    this.apiService.addBook(this.newMember).subscribe({
      next: (data) => {
        if (data.success) {
          this.addMember.emit(data.data);
        } else {
          console.error('Error adding book:', data.error);
        }
      },
      error: (err) => {
        console.error('Error adding book:', err);
      }
    });
    this.onConfirm.emit(true);
    this.isOpen = false;
  }

  handleCancel() {
    this.onConfirm.emit(false);
    this.isOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newMember = {
      name: '',
      email: '',
      membershipType: '',
    };
  }
}
