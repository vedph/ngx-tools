import { ColorMap } from './color-map';

describe('ColorMap', () => {
  let map: ColorMap;

  beforeEach(() => {
    map = new ColorMap();
  });

  it('should be created', () => {
    expect(map).toBeTruthy();
  });

  it('should start empty', () => {
    expect(map.size).toBe(0);
    expect(map.has('v0')).toBe(false);
  });

  it('should return a hex color for a key', () => {
    const color = map.getColorForKey('v0');
    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('should return the same color for the same key', () => {
    const first = map.getColorForKey('v0');
    const second = map.getColorForKey('v0');
    expect(second).toBe(first);
  });

  it('should return different colors for different keys', () => {
    const colors = new Set<string>();
    for (let i = 0; i < 10; i++) {
      colors.add(map.getColorForKey(`v${i}`));
    }
    expect(colors.size).toBe(10);
  });

  it('should track size and has as keys are added', () => {
    expect(map.has('v0')).toBe(false);
    map.getColorForKey('v0');
    expect(map.has('v0')).toBe(true);
    expect(map.size).toBe(1);

    map.getColorForKey('v1');
    expect(map.size).toBe(2);

    // re-requesting an existing key does not grow the map
    map.getColorForKey('v0');
    expect(map.size).toBe(2);
  });

  it('should generate pastel colors (high lightness, moderate saturation)', () => {
    const color = map.getColorForKey('v0');
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2 / 255;
    // pastel colors are expected to be light (>= 70%)
    expect(lightness).toBeGreaterThanOrEqual(0.7);
  });

  it('should clear all cached colors', () => {
    map.getColorForKey('v0');
    map.getColorForKey('v1');
    expect(map.size).toBe(2);

    map.clear();

    expect(map.size).toBe(0);
    expect(map.has('v0')).toBe(false);
  });

  it('should be able to regenerate colors after clearing', () => {
    const before = map.getColorForKey('v0');
    map.clear();
    const after = map.getColorForKey('v0');
    expect(after).toBe(before);
  });
});
