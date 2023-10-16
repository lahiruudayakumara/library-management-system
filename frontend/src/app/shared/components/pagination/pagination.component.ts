import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalPages: number = 0;

  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() onLimitChange = new EventEmitter<number>();

  constructor() {}
}
