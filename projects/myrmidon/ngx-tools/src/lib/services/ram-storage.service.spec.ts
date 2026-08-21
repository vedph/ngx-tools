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

  it('should store and retrieve a value', () => {
    service.store('key', { a: 1 });
    expect(service.retrieve<{ a: number }>('key')).toEqual({ a: 1 });
  });

  it('should ignore the session flag', () => {
    service.store('key', 'value', true);
    expect(service.retrieve('key', false)).toBe('value');
  });

  it('should return null for a missing key', () => {
    expect(service.retrieve('missing')).toBeNull();
  });

  it('should remove a stored value', () => {
    service.store('key', 'value');
    service.remove('key');
    expect(service.retrieve('key')).toBeNull();
  });

  it('should get keys matching a prefix', () => {
    service.store('app.a', 1);
    service.store('app.b', 2);
    service.store('other.c', 3);

    const keys = service.getKeys('app.').sort();
    expect(keys).toEqual(['app.a', 'app.b']);
  });

  it('should clear all entries matching a prefix', () => {
    service.store('app.a', 1);
    service.store('app.b', 2);
    service.store('other.c', 3);

    service.clear('app.');

    expect(service.retrieve('app.a')).toBeNull();
    expect(service.retrieve('app.b')).toBeNull();
    expect(service.retrieve('other.c')).toBe(3);
  });
});
