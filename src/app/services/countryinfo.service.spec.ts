import { TestBed } from '@angular/core/testing';

import { CountryinfoService } from './countryinfo.service';

describe('CountryinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryinfoService = TestBed.get(CountryinfoService);
    expect(service).toBeTruthy();
  });
});
