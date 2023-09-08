import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListViewComponent } from './member-list-view.component';

describe('MemberListViewComponent', () => {
  let component: MemberListViewComponent;
  let fixture: ComponentFixture<MemberListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
