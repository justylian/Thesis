import { TestBed } from '@angular/core/testing';

import { POIService } from './poi.service';

describe('TriposoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POIService = TestBed.get(POIService);
    expect(service).toBeTruthy();
  });
});
