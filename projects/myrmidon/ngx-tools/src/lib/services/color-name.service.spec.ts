import { TestBed } from '@angular/core/testing';

import { ColorNameService } from './color-name.service';

describe('ColorNameService', () => {
  let service: ColorNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getColorHex', () => {
    it('should return the hex value for a known color name', () => {
      expect(service.getColorHex('red')).toBe('#FF0000');
    });

    it('should be case-insensitive', () => {
      expect(service.getColorHex('RED')).toBe('#FF0000');
    });

    it('should ignore whitespace in the name', () => {
      expect(service.getColorHex('light blue')).toBe(
        service.getColorHex('lightblue'),
      );
    });

    it('should return undefined for an unknown color name', () => {
      expect(service.getColorHex('not-a-color')).toBeUndefined();
    });

    it('should return undefined for an empty name', () => {
      expect(service.getColorHex('')).toBeUndefined();
    });
  });

  describe('hasColor', () => {
    it('should return true for a known color', () => {
      expect(service.hasColor('blue')).toBe(true);
    });

    it('should return false for an unknown color', () => {
      expect(service.hasColor('not-a-color')).toBe(false);
    });
  });

  describe('getColorNames', () => {
    it('should return a non-empty array including known colors', () => {
      const names = service.getColorNames();
      expect(names.length).toBeGreaterThan(100);
      expect(names).toContain('red');
      expect(names).toContain('transparent');
    });
  });

  describe('normalizeColor', () => {
    it('should resolve a color name to uppercase hex', () => {
      expect(service.normalizeColor('red')).toBe('#FF0000');
    });

    it('should return transparent as-is', () => {
      expect(service.normalizeColor('transparent')).toBe('transparent');
    });

    it('should normalize a 6-digit hex color to uppercase', () => {
      expect(service.normalizeColor('#ff0000')).toBe('#FF0000');
    });

    it('should expand a 3-digit shorthand hex color', () => {
      expect(service.normalizeColor('#f00')).toBe('#FF0000');
    });

    it('should trim whitespace', () => {
      expect(service.normalizeColor('  red  ')).toBe('#FF0000');
    });

    it('should not resolve color names when noNames is true', () => {
      expect(service.normalizeColor('red', true)).toBeUndefined();
    });

    it('should still resolve hex colors when noNames is true', () => {
      expect(service.normalizeColor('#ff0000', true)).toBe('#FF0000');
    });

    it('should return undefined for an invalid color', () => {
      expect(service.normalizeColor('not-a-color')).toBeUndefined();
    });

    it('should return undefined for an empty color', () => {
      expect(service.normalizeColor('')).toBeUndefined();
    });
  });
});
