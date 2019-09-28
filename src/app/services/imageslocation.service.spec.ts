import { TestBed } from '@angular/core/testing';

import { ImageslocationService } from './imageslocation.service';

describe('ImageslocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageslocationService = TestBed.get(ImageslocationService);
    expect(service).toBeTruthy();
  });
});
