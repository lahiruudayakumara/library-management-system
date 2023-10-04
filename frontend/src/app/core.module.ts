import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './core/services/auth.service';
import { BarcodeComponent } from './shared/components/barcode/barcode.component';
import { BooksEffects } from './store/effects/book.effects';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    // StoreModule.forRoot({ books: booksReducer }),
    // StoreModule.forRoot({ count: counterReducer }),
    EffectsModule.forRoot([AuthEffects]),
    EffectsModule.forRoot([BooksEffects]),
  ],
  providers: [AuthService, BarcodeComponent],
})
export class CoreModule { }
