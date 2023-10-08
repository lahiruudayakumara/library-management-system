import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianLayoutComponent } from './librarian-layout.component';

describe('LibrarianLayoutComponent', () => {
  let component: LibrarianLayoutComponent;
  let fixture: ComponentFixture<LibrarianLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
