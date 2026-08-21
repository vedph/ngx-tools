import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';

import { NgxToolsSignalValidators } from './ngx-tools-signal.validators';

describe('NgxToolsSignalValidators', () => {
  describe('strictMinLength', () => {
    it('should report an error when value is shorter than minLength', () => {
      const model = signal({ value: 'ab' });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.strictMinLength(path.value, 3);
        }),
      );

      expect(f.value().valid()).toBe(false);
      expect(f.value().errors()[0].kind).toBe('strictMinLength');
    });

    it('should not report an error when value length equals minLength', () => {
      const model = signal({ value: 'abc' });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.strictMinLength(path.value, 3);
        }),
      );

      expect(f.value().valid()).toBe(true);
    });

    it('should report an error for an empty array, unlike the standard minLength validator', () => {
      const model = signal({ value: [] as number[] });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.strictMinLength(path.value, 1);
        }),
      );

      expect(f.value().valid()).toBe(false);
    });

    it('should ignore values without a length property', () => {
      const model = signal<{ value: number | null }>({ value: null });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.strictMinLength(path.value as any, 3);
        }),
      );

      expect(f.value().valid()).toBe(true);
    });
  });

  describe('conditional', () => {
    it('should apply the validator only when the predicate is true', () => {
      const model = signal({ enabled: true, value: '' });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.conditional(
            path.value,
            (ctx) => ctx.valueOf(path.enabled),
            (ctx) => (ctx.value() ? null : { kind: 'required' }),
          );
        }),
      );

      expect(f.value().valid()).toBe(false);

      model.set({ enabled: false, value: '' });
      expect(f.value().valid()).toBe(true);
    });
  });

  describe('atLeastOneRequired', () => {
    it('should report an error when no sibling field has a value', () => {
      const model = signal({ alt1: '', alt2: '' });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.atLeastOneRequired(path, [
            path.alt1,
            path.alt2,
          ]);
        }),
      );

      expect(f().valid()).toBe(false);
      expect(f().errors()[0].kind).toBe('atLeastOneRequired');
    });

    it('should not report an error when at least one sibling field has a value', () => {
      const model = signal({ alt1: '', alt2: 'x' });
      const f = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
          NgxToolsSignalValidators.atLeastOneRequired(path, [
            path.alt1,
            path.alt2,
          ]);
        }),
      );

      expect(f().valid()).toBe(true);
    });
  });
});
