import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    DateFormatPipe
  ],
  exports: [
    DateFormatPipe
  ]
})
export class SharedModule { }
