import { TestBed } from '@angular/core/testing';

import { EnvService } from './env.service';

describe('EnvService', () => {
  let originalEnv: Record<string, string> | undefined;

  beforeEach(() => {
    // EnvService keeps its own static singleton independently of Angular's
    // injector, so it must be reset manually between tests.
    (EnvService as unknown as { instance: EnvService | null }).instance =
      null;
    originalEnv = (window as unknown as { __env?: Record<string, string> })
      .__env;
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    (window as unknown as { __env?: Record<string, string> }).__env =
      originalEnv;
    (EnvService as unknown as { instance: EnvService | null }).instance =
      null;
  });

  it('should be created', () => {
    const service = TestBed.inject(EnvService);
    expect(service).toBeTruthy();
  });

  it('should read variables from window.__env at construction', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {
      apiUrl: 'http://localhost/api',
    };
    const service = TestBed.inject(EnvService);
    expect(service.get('apiUrl')).toBe('http://localhost/api');
  });

  it('should return the default value for a missing key', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {};
    const service = TestBed.inject(EnvService);
    expect(service.get('missing', 'fallback')).toBe('fallback');
  });

  it('should return undefined for a missing key without a default', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {};
    const service = TestBed.inject(EnvService);
    expect(service.get('missing')).toBeUndefined();
  });

  it('should set and delete values', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {};
    const service = TestBed.inject(EnvService);

    service.set('key', 'value');
    expect(service.get('key')).toBe('value');

    service.delete('key');
    expect(service.get('key')).toBeUndefined();
  });

  it('should enumerate all keys', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {
      a: '1',
      b: '2',
    };
    const service = TestBed.inject(EnvService);
    expect(Array.from(service.getKeys()).sort()).toEqual(['a', 'b']);
  });

  it('should clear all values', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {
      a: '1',
    };
    const service = TestBed.inject(EnvService);
    service.clear();
    expect(Array.from(service.getKeys())).toEqual([]);
  });

  it('should behave as a singleton, shared across injections', () => {
    (window as unknown as { __env: Record<string, string> }).__env = {};
    const a = TestBed.inject(EnvService);
    const b = TestBed.inject(EnvService);

    expect(a).toBe(b);
    a.set('shared', 'yes');
    expect(b.get('shared')).toBe('yes');
  });
});
