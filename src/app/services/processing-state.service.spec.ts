import { TestBed } from '@angular/core/testing';

import { ProcessingStateService } from './processing-state.service';

describe('ProcessingStateService', () => {
  let service: ProcessingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
