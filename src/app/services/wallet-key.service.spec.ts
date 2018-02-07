import { TestBed, inject } from '@angular/core/testing';

import { WalletKeyService } from './wallet-key.service';

describe('WalletKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletKeyService]
    });
  });

  it('should be created', inject([WalletKeyService], (service: WalletKeyService) => {
    expect(service).toBeTruthy();
  }));
});
