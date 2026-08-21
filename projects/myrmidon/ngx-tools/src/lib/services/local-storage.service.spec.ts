import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a value from local storage', () => {
    service.store('key', { a: 1 });
    expect(service.retrieve<{ a: number }>('key')).toEqual({ a: 1 });
  });

  it('should store and retrieve a value from session storage', () => {
    service.store('key', { a: 1 }, true);
    expect(service.retrieve<{ a: number }>('key', true)).toEqual({ a: 1 });
    // it should not leak into local storage
    expect(service.retrieve('key')).toBeNull();
  });

  it('should return null for a missing key', () => {
    expect(service.retrieve('missing')).toBeNull();
  });

  it('should remove a stored value', () => {
    service.store('key', 'value');
    service.remove('key');
    expect(service.retrieve('key')).toBeNull();
  });

  it('should remove a stored value from session storage', () => {
    service.store('key', 'value', true);
    service.remove('key', true);
    expect(service.retrieve('key', true)).toBeNull();
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
