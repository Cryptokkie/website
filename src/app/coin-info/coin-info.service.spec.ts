import { TestBed } from '@angular/core/testing';

import { CoinInfoService } from './coin-info.service';

describe('CoinInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoinInfoService = TestBed.get(CoinInfoService);
    expect(service).toBeTruthy();
  });
});
