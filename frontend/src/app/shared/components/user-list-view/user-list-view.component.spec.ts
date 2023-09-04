import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListViewComponent } from './user-list-view.component';

describe('UserListViewComponent', () => {
  let component: UserListViewComponent;
  let fixture: ComponentFixture<UserListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
