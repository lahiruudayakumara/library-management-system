import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopChoiceListViewComponent } from './top-choice-list-view.component';

describe('TopChoiceListViewComponent', () => {
  let component: TopChoiceListViewComponent;
  let fixture: ComponentFixture<TopChoiceListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopChoiceListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopChoiceListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
