import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';

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

  @ViewChild('barcodeElement', { static: false }) barcodeElement!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.barcodeElement) {
      this.generateBarcode();
    }
  }

  ngAfterViewInit(): void {
    this.generateBarcode();
  }

  generateBarcode(): void {
    if (!this.value || this.value.trim() === '') {
      console.error('Barcode value is empty or invalid');
      return;
    }

    try {
      if (this.barcodeElement?.nativeElement) {
        JsBarcode(this.barcodeElement.nativeElement, this.value, {
          format: 'CODE128',
          displayValue: true,
          height: 100,
          ...this.options, // Allow customization
        });
      } else {
        console.error('Barcode element is not available.');
      }
    } catch (error) {
      console.error('Barcode generation failed:', error);
    }
  }
}
