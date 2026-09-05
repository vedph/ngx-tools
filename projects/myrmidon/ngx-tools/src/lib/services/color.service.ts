import { Injectable } from '@angular/core';

/**
 * Colors helper service.
 * This service focuses on color space conversions (RGB, HSL, hex) and other
 * generic, lightweight color math. It does not deal with named colors
 * (see ColorNameService for that) nor with complex color theory.
 */
@Injectable({
  providedIn: 'root',
})
export class ColorService {
  /**
   * Convert a single 0-255 numeric component into a 2-digits hex string,
   * clamping and rounding it so that out-of-range or non-integer inputs
   * never produce a malformed (wrongly padded) result.
   *
   * @param value The numeric component (expected in the 0-255 range).
   * @returns A 2-characters lowercase hex string.
   */
  private componentToHex(value: number): string {
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    const hex = clamped.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * Get the R,G,B components of the color expressed by the specified
   * RGB string (3 or 6 digits format).
   *
   * @param rgb The RGB color string (3 or 6 digits).
   * @returns An array where [0]=R, [1]=G, [2]=B, or null if invalid
   * input string.
   */
  public getRgb(rgb: string): number[] | null {
    if (!rgb) {
      return null;
    }
    rgb = rgb.trim();

    // RGB
    let m = rgb.match(/^#?([0-9a-f]{3})$/i);
    if (m && m[1]) {
      // in 3-characters format, each value is multiplied by 0x11 to give an
      // even scale from 0x00 to 0xff
      return [
        parseInt(m[1].charAt(0), 16) * 0x11,
        parseInt(m[1].charAt(1), 16) * 0x11,
        parseInt(m[1].charAt(2), 16) * 0x11,
      ];
    }
    // RRGGBB
    m = rgb.match(/^#?([0-9a-f]{6})$/i);
    if (m && m[1]) {
      return [
        parseInt(m[1].substring(0, 2), 16),
        parseInt(m[1].substring(2, 4), 16),
        parseInt(m[1].substring(4, 6), 16),
      ];
    }
    return null;
  }

  /**
   * Get black or white according to which of them has the maximum contrast
   * against the specified color.
   *
   * @param rgb The RGB color string.
   * @returns Black or white. If rgb is invalid, always black.
   */
  public getContrastColor(rgb: string): string {
    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    const values = this.getRgb(rgb);
    if (!values) {
      return 'black';
    }
    return values[0] * 0.299 + values[1] * 0.587 + values[2] * 0.114 > 186
      ? 'black'
      : 'white';
  }

  /**
   * Convert HSL to RGB.
   *
   * @param h Hue (0-360).
   * @param s Saturation (0-100).
   * @param l Lightness (0-100).
   * @returns Object with r, g, b values (0-255).
   */
  public hslToRgb(
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } {
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    // must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r: r, g: g, b: b };
  }

  /**
   * Convert RGB to HSL.
   *
   * @param r Red (0-255).
   * @param g Green (0-255).
   * @param b Blue (0-255).
   * @returns Object with h (0-360), s (0-100), l (0-100) values.
   */
  public rgbToHsl(
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } {
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));

      switch (max) {
        case r:
          h = ((g - b) / delta) % 6;
          break;
        case g:
          h = (b - r) / delta + 2;
          break;
        default:
          h = (r - g) / delta + 4;
          break;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  /**
   * Get the RRGGBB hex representation (without leading #) of the specified
   * RGB components. Components are clamped to the 0-255 range and rounded,
   * so this never produces a malformed result even with out-of-range or
   * non-integer input.
   *
   * @param r Red (0-255).
   * @param g Green (0-255).
   * @param b Blue (0-255).
   * @returns The RRGGBB hex string (no leading #).
   */
  public rgbToString(r: number, g: number, b: number): string {
    return (
      this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
    );
  }

  /**
   * Get the #RRGGBB hex representation of the specified RGB components.
   *
   * @param r Red (0-255).
   * @param g Green (0-255).
   * @param b Blue (0-255).
   * @returns The #RRGGBB hex string.
   */
  public rgbToHex(r: number, g: number, b: number): string {
    return '#' + this.rgbToString(r, g, b);
  }

  /**
   * Convert HSL directly into a #RRGGBB hex string.
   *
   * @param h Hue (0-360).
   * @param s Saturation (0-100).
   * @param l Lightness (0-100).
   * @returns The #RRGGBB hex string.
   */
  public hslToHex(h: number, s: number, l: number): string {
    const rgb = this.hslToRgb(h, s, l);
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  /**
   * Get the next color from a palette generated to include
   * the specified count of colors.
   *
   * @param index The index of the next color in the palette.
   * @param count The total count of colors in the palette.
   * @param blueBoost True to adjust colors for the eye's lack of sensitivity to blue.
   * @returns The RRGGBB values string.
   */
  public nextPaletteColor(
    index: number,
    count: number,
    blueBoost = true
  ): string {
    // https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
    const h = Math.floor((index / count) * 341); // between 0 and 340
    let s = 100;
    let l = 50;

    if (blueBoost && h > 215 && h < 265) {
      const gain = 20;
      let blueness = 1 - Math.abs(h - 240) / 25;
      let change = Math.floor(gain * blueness);
      l += change;
      s -= change;
    }
    const rgb = this.hslToRgb(h, s, l);
    return this.rgbToString(rgb.r, rgb.g, rgb.b);
  }
}
