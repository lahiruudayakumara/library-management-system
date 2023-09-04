import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListViewComponent } from './staff-list-view.component';

describe('StaffListViewComponent', () => {
  let component: StaffListViewComponent;
  let fixture: ComponentFixture<StaffListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
