import { Component, EventEmitter, Output } from '@angular/core';

import { BarcodeFormat } from '@zxing/library';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss'
})
export class BarcodeScannerComponent {
  @Output() scanSuccess = new EventEmitter<string>(); // Emits the scanned result
  scanResult: string = ''; // Store the last scanned result
  hasPermission: boolean = false; // Tracks if the scanner has permission to use the camera
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128];

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('Cameras found:', devices);
    if (devices.length > 0) {
      this.hasPermission = true;
    }
  }

  onScanSuccess(result: string): void {
    this.scanResult = result;
    this.scanSuccess.emit(result); // Emit the scanned result to the parent component
    console.log('Scan result:', result);
  }

  onError(error: any): void {
    console.error('Error:', error);
  }
}
