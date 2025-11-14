import { Injectable } from '@angular/core';

/**
 * Service that provides color name to hex conversion.
 */
@Injectable({
  providedIn: 'root',
})
export class ColorNameService {
  // https://www.w3.org/TR/css-color-4/#named-colors
  // All 147 standard CSS Color Module Level 4 named colors
  private readonly _colorMap: { [key: string]: string } = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blue: '#0000FF',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgreen: '#006400',
    darkgrey: '#A9A9A9',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    fuchsia: '#FF00FF',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#ADFF2F',
    grey: '#808080',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgray: '#D3D3D3',
    lightgreen: '#90EE90',
    lightgrey: '#D3D3D3',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    lime: '#00FF00',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#FF00FF',
    maroon: '#800000',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    navy: '#000080',
    oldlace: '#FDF5E6',
    olive: '#808000',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#DB7093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#FF0000',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    silver: '#C0C0C0',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    teal: '#008080',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    wheat: '#F5DEB3',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
    yellow: '#FFFF00',
    yellowgreen: '#9ACD32',
    transparent: 'transparent', // Special case: fully transparent color
  };

  /**
   * Get hex value from a color name.
   *
   * @param name Name of the color (case-insensitive).
   * @returns Hex color value (or 'transparent' for transparent color),
   * or undefined if not found.
   */
  public getColorHex(name: string): string | undefined {
    if (!name) return undefined;

    // normalize the color name (lowercase, remove spaces)
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
   * This function is designed to be safe for use in Angular pipes and will
   * never throw errors, returning undefined for invalid inputs instead.
   *
   * @param color Color value (name or hex, including shorthand).
   * @param noNames If true, color names will not be resolved (default: false).
   * @returns Normalized hex color (or 'transparent'), or undefined if invalid.
   */
  public normalizeColor(color: string, noNames = false): string | undefined {
    try {
      if (!color) return undefined;

      // trim whitespace
      color = color.trim();
      if (!color) return undefined;

      // check for hex pattern (6-digit or 3-digit)
      const isHex = /^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/i.test(color);

      // if it's not a hex pattern and noNames is false, try to resolve as color name
      if (!isHex && !noNames) {
        const hexFromName = this.getColorHex(color);
        if (hexFromName) {
          // special case: transparent should be returned as-is
          if (hexFromName === 'transparent') return 'transparent';
          return hexFromName.toUpperCase();
        }
      }

      // if it's already a valid 6-digit hex, return it normalized
      if (/^#[0-9A-Fa-f]{6}$/i.test(color)) {
        return color.toUpperCase();
      }

      // handle shorthand hex (e.g., #ABC -> #AABBCC)
      if (/^#[0-9A-Fa-f]{3}$/i.test(color)) {
        return (
          '#' +
          color[1].repeat(2) +
          color[2].repeat(2) +
          color[3].repeat(2)
        ).toUpperCase();
      }

      // if we reach here, the color is invalid
      return undefined;
    } catch (error) {
      // graceful fallback: never throw errors in pipes:
      // log to console in development for debugging
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(
          'ColorNameService.normalizeColor: Error processing color:',
          color,
          error
        );
      }
      return undefined;
    }
  }
}
