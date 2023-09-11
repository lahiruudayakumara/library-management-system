import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianOverviewComponent } from './librarian-overview.component';

describe('LibrarianOverviewComponent', () => {
  let component: LibrarianOverviewComponent;
  let fixture: ComponentFixture<LibrarianOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
