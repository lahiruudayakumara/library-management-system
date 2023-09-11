import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantOverviewComponent } from './assistant-overview.component';

describe('AssistantOverviewComponent', () => {
  let component: AssistantOverviewComponent;
  let fixture: ComponentFixture<AssistantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
