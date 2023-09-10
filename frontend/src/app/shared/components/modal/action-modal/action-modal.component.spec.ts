import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionModalComponent } from './action-modal.component';

describe('ActionModalComponent', () => {
  let component: ActionModalComponent;
  let fixture: ComponentFixture<ActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
