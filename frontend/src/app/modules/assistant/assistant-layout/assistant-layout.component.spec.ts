import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantLayoutComponent } from './assistant-layout.component';

describe('AssistantLayoutComponent', () => {
  let component: AssistantLayoutComponent;
  let fixture: ComponentFixture<AssistantLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
