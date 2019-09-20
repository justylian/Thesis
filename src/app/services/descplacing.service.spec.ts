import { TestBed } from '@angular/core/testing';

import { DescplacingService } from './descplacing.service';

describe('DescplacingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescplacingService = TestBed.get(DescplacingService);
    expect(service).toBeTruthy();
  });
});
