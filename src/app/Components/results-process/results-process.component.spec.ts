import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsProcessComponent } from './results-process.component';

describe('ResultsProcessComponent', () => {
  let component: ResultsProcessComponent;
  let fixture: ComponentFixture<ResultsProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsProcessComponent]
    });
    fixture = TestBed.createComponent(ResultsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
