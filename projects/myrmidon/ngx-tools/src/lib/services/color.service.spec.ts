import { TestBed } from '@angular/core/testing';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRgb', () => {
    it('should parse a 6-digit hex color with #', () => {
      expect(service.getRgb('#ff0000')).toEqual([255, 0, 0]);
    });

    it('should parse a 6-digit hex color without #', () => {
      expect(service.getRgb('00ff00')).toEqual([0, 255, 0]);
    });

    it('should parse a 3-digit hex color', () => {
      expect(service.getRgb('#00f')).toEqual([0, 0, 255]);
    });

    it('should be case-insensitive', () => {
      expect(service.getRgb('#ABCDEF')).toEqual([0xab, 0xcd, 0xef]);
    });

    it('should trim whitespace', () => {
      expect(service.getRgb('  #ff0000  ')).toEqual([255, 0, 0]);
    });

    it('should return null for an invalid color', () => {
      expect(service.getRgb('not-a-color')).toBeNull();
    });

    it('should return null for an empty string', () => {
      expect(service.getRgb('')).toBeNull();
    });

    it('should return null for a wrong-length hex string', () => {
      expect(service.getRgb('#ffff')).toBeNull();
    });
  });

  describe('getContrastColor', () => {
    it('should return black for a light color', () => {
      expect(service.getContrastColor('#ffffff')).toBe('black');
    });

    it('should return white for a dark color', () => {
      expect(service.getContrastColor('#000000')).toBe('white');
    });

    it('should return black for an invalid color', () => {
      expect(service.getContrastColor('not-a-color')).toBe('black');
    });
  });

  describe('hslToRgb', () => {
    it('should convert red', () => {
      expect(service.hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert green', () => {
      expect(service.hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should convert blue', () => {
      expect(service.hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('should convert white', () => {
      expect(service.hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should convert black', () => {
      expect(service.hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe('rgbToHsl', () => {
    it('should convert red', () => {
      expect(service.rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
    });

    it('should convert green', () => {
      expect(service.rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
    });

    it('should convert blue', () => {
      expect(service.rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
    });

    it('should convert white', () => {
      expect(service.rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
    });

    it('should convert black', () => {
      expect(service.rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
    });

    it('should convert gray without a division by zero', () => {
      expect(service.rgbToHsl(128, 128, 128)).toEqual({ h: 0, s: 0, l: 50 });
    });

    it('should round-trip through hslToRgb', () => {
      const hsl = service.rgbToHsl(200, 100, 50);
      const rgb = service.hslToRgb(hsl.h, hsl.s, hsl.l);
      expect(rgb).toEqual({ r: 200, g: 100, b: 50 });
    });
  });

  describe('rgbToString', () => {
    it('should convert RGB components to a hex string without #', () => {
      expect(service.rgbToString(255, 0, 0)).toBe('ff0000');
    });

    it('should pad single-digit hex components with a leading zero', () => {
      expect(service.rgbToString(0, 1, 15)).toBe('00010f');
    });

    it('should clamp out-of-range components', () => {
      expect(service.rgbToString(-10, 300, 128)).toBe('00ff80');
    });

    it('should round non-integer components', () => {
      expect(service.rgbToString(128.6, 0, 0)).toBe('810000');
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB components to a hex string with #', () => {
      expect(service.rgbToHex(255, 0, 0)).toBe('#ff0000');
    });
  });

  describe('hslToHex', () => {
    it('should convert HSL directly to a hex string', () => {
      expect(service.hslToHex(0, 100, 50)).toBe('#ff0000');
    });

    it('should match hslToRgb + rgbToHex', () => {
      const rgb = service.hslToRgb(210, 60, 70);
      expect(service.hslToHex(210, 60, 70)).toBe(
        service.rgbToHex(rgb.r, rgb.g, rgb.b)
      );
    });
  });

  describe('nextPaletteColor', () => {
    it('should return distinct colors for distinct indexes', () => {
      const count = 5;
      const colors = new Set<string>();
      for (let i = 0; i < count; i++) {
        colors.add(service.nextPaletteColor(i, count));
      }
      expect(colors.size).toBe(count);
    });

    it('should return a 6-characters hex string without #', () => {
      const color = service.nextPaletteColor(0, 5);
      expect(color).toMatch(/^[0-9a-f]{6}$/i);
    });

    it('should be deterministic for the same arguments', () => {
      expect(service.nextPaletteColor(2, 8)).toBe(
        service.nextPaletteColor(2, 8)
      );
    });
  });
});
