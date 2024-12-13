import { Injectable } from '@angular/core';

/**
 * Service that provides color name to hex conversion.
 */
@Injectable({
  providedIn: 'root',
})
export class ColorNameService {
  private readonly _colorMap: { [key: string]: string } = {
    // Basic Colors
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    yellow: '#FFFF00',
    purple: '#800080',
    orange: '#FFA500',
    pink: '#FFC0CB',
    brown: '#A52A2A',
    gray: '#808080',
    cyan: '#00FFFF',
    magenta: '#FF00FF',

    // Extended Basic Colors
    navy: '#000080',
    darkblue: '#00008B',
    mediumblue: '#0000CD',
    darkgreen: '#006400',
    teal: '#008080',
    darkred: '#8B0000',
    maroon: '#800000',
    olive: '#808000',
    lime: '#00FF00',
    aqua: '#00FFFF',
    silver: '#C0C0C0',
    gold: '#FFD700',

    // Shade Variations
    lightblue: '#ADD8E6',
    lightgreen: '#90EE90',
    darkgray: '#A9A9A9',
    lightgray: '#D3D3D3',
    darkgrey: '#A9A9A9',
    lightgrey: '#D3D3D3',
    darkpurple: '#301934',
    lightpurple: '#E6E6FA',
    darkorange: '#FF8C00',
    lightorange: '#FFA07A',
    darkpink: '#FF1493',
    lightpink: '#FFB6C1',

    // Named Web Colors
    indianred: '#CD5C5C',
    crimson: '#DC143C',
    coral: '#FF7F50',
    tomato: '#FF6347',
    orangered: '#FF4500',
    deeppink: '#FF1493',
    hotpink: '#FF69B4',
    lavender: '#E6E6FA',
    dodgerblue: '#1E90FF',
    royalblue: '#4169E1',
    cornflowerblue: '#6495ED',
    steelblue: '#4682B4',
    forestgreen: '#228B22',
    seagreen: '#2E8B57',
    limegreen: '#32CD32',
    mediumseagreen: '#3CB371',
    chocolate: '#D2691E',
    sienna: '#A0522D',
    saddlebrown: '#8B4513',
    sandybrown: '#F4A460',
    darkkhaki: '#BDB76B',
    goldenrod: '#DAA520',
    peru: '#CD853F',
    darkgoldenrod: '#B8860B',
    indigo: '#4B0082',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumslateblue: '#7B68EE',
    slateblue: '#6A5ACD',
    darkslateblue: '#483D8B',
    mediumturquoise: '#48D1CC',
    cadetblue: '#5F9EA0',
    darkcyan: '#008B8B',
    lightseagreen: '#20B2AA',
    darkturquoise: '#00CED1',
    honeydew: '#F0FFF0',
    azure: '#F0FFFF',
    whitesmoke: '#F5F5F5',
    beige: '#F5F5DC',
    ivory: '#FFFFF0',
    lightyellow: '#FFFFE0',
  };

  /**
   * Get hex value from a color name.
   *
   * @param name Name of the color (case-insensitive).
   * @returns Hex color value, or undefined if not found.
   */
  private getColorHex(name: string): string | undefined {
    if (!name) return undefined;

    // Normalize the color name (lowercase, remove spaces)
    const normalizedName = name.toLowerCase().replace(/\s+/g, '');

    return this._colorMap[normalizedName];
  }

  /**
   * Check if a color name exists in the service color map.
   *
   * @param name Name of the color (case-insensitive).
   * @returns Boolean indicating if color exists.
   */
  public hasColor(name: string): boolean {
    return this.getColorHex(name) !== undefined;
  }

  /**
   * Get all available color names in the service color map.
   *
   * @returns Array of color names.
   */
  public getColorNames(): string[] {
    return Object.keys(this._colorMap);
  }

  /**
   * Normalize a color value to its uppercase hex representation.
   *
   * @param color Color value (name or hex, including shorthand).
   * @returns Normalized hex color, or undefined.
   */
  public normalizeColor(color: string): string | undefined {
    if (!color) return undefined;

    // if it's already a valid hex, return it
    if (/^#[0-9A-Fa-f]{6}$/i.test(color)) return color.toUpperCase();

    // try to get hex from color name
    const hexFromName = this.getColorHex(color);
    if (hexFromName) return hexFromName.toUpperCase();

    // handle shorthand hex
    if (/^#[0-9A-Fa-f]{3}$/i.test(color)) {
      return (
        '#' +
        color[1].repeat(2) +
        color[2].repeat(2) +
        color[3].repeat(2)
      ).toUpperCase();
    }

    return undefined;
  }
}
