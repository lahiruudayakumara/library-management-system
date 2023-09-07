import { BookText, Info, LucideAngularModule } from 'lucide-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlertModalComponent } from "../alert-modal/alert-modal.component";
import { ApiService } from '../../../../core/services/api.service';
import { BarcodeComponent } from "../../barcode/barcode.component";
import { BarcodeScannerComponent } from "../../barcode-scanner/barcode-scanner.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, BarcodeComponent, AlertModalComponent],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.scss'
})
export class AddBookModalComponent {
  isAlertOpen: boolean = true;
  @Input() isOpen: boolean = false; // Controls modal visibility
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';

  @Output() onConfirm = new EventEmitter<boolean>();

  @Output() closeModal = new EventEmitter<void>();
  @Output() addBook = new EventEmitter<any>();

  // Initialize a book object
  newBook = {
    title: '',
    author: '',
    isbn: '',
    genresString: '',
    description: '',
    publishedDate: '',
    totalCopies: 1,
    availableCopies: 1,
    addedBy: '607e1f8b8bcb8e3f74158a32', // Example user ID
    updatedBy: '607e1f8b8bcb8e3f74158a32',
    isActive: true
  };

  readonly BookText = BookText;

  constructor(private apiService: ApiService) { }

  handleYes(): void {
    this.generateBarcode(this.newBook.isbn);
    this.apiService.addBook(this.newBook).subscribe({
      next: (data) => {
        if (data.success) {
          this.addBook.emit(data.data);
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
    this.resetForm();
  }

  handleNo(): void {
    this.onConfirm.emit(false);
    this.isOpen = false;
    this.resetForm();
  }

  private resetForm() {
    this.newBook = {
      title: '',
      author: '',
      isbn: '',
      genresString: '',
      description: '',
      publishedDate: '',
      totalCopies: 1,
      availableCopies: 1,
      addedBy: '607e1f8b8bcb8e3f74158a32',
      updatedBy: '607e1f8b8bcb8e3f74158a32',
      isActive: true
    };
  }

  generateBarcode(data: string) {
    if (data) {
      JsBarcode('#barcode', data, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true
      });
      // Automatically print the barcode
      this.printBarcode();
    }
  }

  printBarcode() {
    const barcodeElement = document.querySelector('#barcode') as HTMLElement;
    const newWindow = window.open('', '_blank');
    if (newWindow && barcodeElement) {
      newWindow.document.write(`
        <html>
          <head><title>Print Barcode</title></head>
          <body>${barcodeElement.outerHTML}</body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  }
}
