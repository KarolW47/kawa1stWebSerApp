import { TestBed } from '@angular/core/testing';

import { RefreshTokenService } from './refresh-token.service';

describe('TokenService', () => {
  let service: RefreshTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
