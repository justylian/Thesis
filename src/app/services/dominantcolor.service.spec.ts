import { TestBed } from '@angular/core/testing';

import { DominantcolorService } from './dominantcolor.service';

describe('DominantcolorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DominantcolorService = TestBed.get(DominantcolorService);
    expect(service).toBeTruthy();
  });
});
