import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BarcodeComponent } from "../../barcode/barcode.component";
import { FormModalComponent } from "../form-modal/form-modal.component";

@Component({
  selector: 'app-print-barcode-modal',
  standalone: true,
  imports: [FormModalComponent, BarcodeComponent],
  templateUrl: './print-barcode-modal.component.html',
  styleUrl: './print-barcode-modal.component.scss'
})
export class PrintBarcodeModalComponent {
  @Input() isOpen: boolean = false;
  @Input() barcode: string = '';

  @Output() onPrint = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onGenerate = new EventEmitter<void>();
}
