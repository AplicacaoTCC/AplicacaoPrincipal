import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingAnalysisComponent } from './awaiting-analysis.component';

describe('AwaitingAnalysisComponent', () => {
  let component: AwaitingAnalysisComponent;
  let fixture: ComponentFixture<AwaitingAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwaitingAnalysisComponent]
    });
    fixture = TestBed.createComponent(AwaitingAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
