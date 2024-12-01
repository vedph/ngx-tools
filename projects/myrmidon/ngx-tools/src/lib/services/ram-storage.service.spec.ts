import { TestBed } from '@angular/core/testing';

import { RamStorageService } from './ram-storage.service';

describe('RamStorageService', () => {
  let service: RamStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
