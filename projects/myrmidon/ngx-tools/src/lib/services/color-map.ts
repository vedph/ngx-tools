import { ColorService } from './color.service';

/**
 * Golden ratio conjugate, used to derive hues that are maximally spread
 * apart from one another (golden-angle distribution).
 * https://en.wikipedia.org/wiki/Golden_angle
 */
const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;

/**
 * A class representing a palette of pastel colors mapping any given keys to
 * unique colors, with maximum visual distinction.
 * This is used to assign consistent colors to an external set of keys on demand,
 * always returning the same color for the same key. It is not a singleton service
 * because it just represents a map object and you could use multiple instances
 * if needed for various palettes, each with its set of keys.
 * The map uses HSL color space to generate evenly distributed, light, pastel
 * colors.
 */
export class ColorMap {
  private readonly _colorService = new ColorService();
  private readonly _colors = new Map<string, string>();

  /**
   * The count of colors generated so far.
   */
  public get size(): number {
    return this._colors.size;
  }

  /**
   * Generate a pastel color for a given key.
   * The color generation is idempotent - same key always generates the same
   * color, provided the map has not been cleared and repopulated in a
   * different order.
   *
   * @param key Key (e.g., "v0", "v1", "v2").
   * @returns Pastel color as hex string (e.g., "#FFE4E1").
   */
  public getColorForKey(key: string): string {
    const existing = this._colors.get(key);
    if (existing) {
      return existing;
    }

    const color = this.generatePastelColor(this._colors.size);
    this._colors.set(key, color);

    return color;
  }

  /**
   * Check whether a color has already been generated for the given key.
   *
   * @param key Key to check.
   * @returns True if a color has already been assigned to the key.
   */
  public has(key: string): boolean {
    return this._colors.has(key);
  }

  /**
   * Generate a pastel color using HSL color space with golden ratio
   * distribution. This ensures maximum visual distinction between colors.
   *
   * @param index Index of the color in generation order.
   * @returns Hex color string.
   */
  private generatePastelColor(index: number): string {
    // use the golden angle to maximize visual distinction between hues
    const hue = (index * GOLDEN_RATIO_CONJUGATE * 360) % 360;

    // pastel colors: high lightness (78-84%), low saturation (45-55%)
    const saturation = 45 + (index % 3) * 5;
    const lightness = 78 + (index % 4) * 2;

    return this._colorService.hslToHex(hue, saturation, lightness);
  }

  /**
   * Clear all cached colors.
   */
  public clear(): void {
    this._colors.clear();
  }
}
