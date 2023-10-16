import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBarcodeModalComponent } from './print-barcode-modal.component';

describe('PrintBarcodeModalComponent', () => {
  let component: PrintBarcodeModalComponent;
  let fixture: ComponentFixture<PrintBarcodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintBarcodeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintBarcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
