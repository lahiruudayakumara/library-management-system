import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDateTimeComponentComponent } from './welcome-date-time-component.component';

describe('WelcomeDateTimeComponentComponent', () => {
  let component: WelcomeDateTimeComponentComponent;
  let fixture: ComponentFixture<WelcomeDateTimeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeDateTimeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeDateTimeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
