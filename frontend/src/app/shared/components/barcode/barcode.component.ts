import { Component, Input, SimpleChanges } from '@angular/core';

import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [],
  templateUrl: './barcode.component.html',
  styleUrl: './barcode.component.scss'
})
export class BarcodeComponent {
  @Input() value: string = ''; // The value to encode in the barcode
  @Input() options: any = {}; // Optional settings for JsBarcode

  ngAfterViewInit(): void {
    this.generateBarcode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.generateBarcode();
    }
  }

  generateBarcode(): void {
    try {
      JsBarcode('#barcode', this.value || '000000', {
        format: 'CODE128',
        displayValue: true,
        height: 100,
        ...this.options, // Allow customization
      });
    } catch (error) {
      console.error('Barcode generation failed:', error);
    }
  }
}
