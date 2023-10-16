import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberModalComponent } from './update-member-modal.component';

describe('UpdateMemberModalComponent', () => {
  let component: UpdateMemberModalComponent;
  let fixture: ComponentFixture<UpdateMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMemberModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
