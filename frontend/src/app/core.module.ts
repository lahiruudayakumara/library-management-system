import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';
import { BarcodeComponent } from './shared/components/barcode/barcode.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [AuthGuard, AuthService, BarcodeComponent],
})
export class CoreModule { }
