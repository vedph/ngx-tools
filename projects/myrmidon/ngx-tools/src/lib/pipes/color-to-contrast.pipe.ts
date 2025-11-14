import { Pipe, PipeTransform } from '@angular/core';
import { ColorNameService } from '../services/color-name.service';

const DEFAULT_COLOR = '#000000';

/**
 * Pipe that converts a color to a contrasting color (black or white).
 * Supports color names (e.g., 'blue', 'red', 'transparent'), hex colors (#RGB or #RRGGBB).
 * The default color in case of error is black, but you can provide a custom one
 * as a second argument.
 *
 * For transparent colors, returns black (#000000) as the contrast color.
 *
 * Usage examples:
 * {{ 'blue' | colorToContrast }}
 * {{ '#FF0000' | colorToContrast }}
 * {{ 'transparent' | colorToContrast }}
 * {{ 'blue' | colorToContrast:'#FF0000' }}
 * <div [ngStyle]="{'background-color': (someString | stringToColor : customColors),
 * 'color': (someString | stringToColor : customColors) | colorToContrast}">
 * {{ someString }}
 * </div>
 */
@Pipe({ name: 'colorToContrast' })
export class ColorToContrastPipe implements PipeTransform {
  constructor(private _colorService: ColorNameService) {}

  public transform(
    value: string | null | undefined,
    defaultColor?: string
  ): string {
    try {
      const fallbackColor = defaultColor || DEFAULT_COLOR;

      // return fallback for null or undefined
      if (!value) {
        return fallbackColor;
      }

      // normalize the input (handles color names and hex values)
      const normalizedValue = this._colorService.normalizeColor(value);
      if (!normalizedValue) {
        console.warn(
          `ColorToContrastPipe: Invalid color value "${value}", defaulting to ${fallbackColor}.`
        );
        return fallbackColor;
      }

      // special case: transparent color
      // for transparent backgrounds, black provides the best default contrast
      if (normalizedValue === 'transparent') {
        return '#000000';
      }

      // validate that we have a hex color at this point
      if (!normalizedValue.startsWith('#')) {
        console.warn(
          `ColorToContrastPipe: Unexpected color format "${normalizedValue}" from "${value}", defaulting to ${fallbackColor}.`
        );
        return fallbackColor;
      }

      // convert hex color to RGB
      const rgb = parseInt(normalizedValue.slice(1), 16);

      // validate the parsed value
      if (isNaN(rgb)) {
        console.warn(
          `ColorToContrastPipe: Failed to parse hex color "${normalizedValue}" from "${value}", defaulting to ${fallbackColor}.`
        );
        return fallbackColor;
      }

      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      // calculate the relative luminance using WCAG recommended formula
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // return white for dark colors and black for light colors
      // using a slightly adjusted threshold for better contrast
      return luminance > 0.5 ? '#000000' : '#FFFFFF';
    } catch (error) {
      // graceful fallback: never throw errors in pipes
      const fallbackColor = defaultColor || DEFAULT_COLOR;
      console.error(
        `ColorToContrastPipe: Unexpected error processing color "${value}":`,
        error,
        `Defaulting to ${fallbackColor}.`
      );
      return fallbackColor;
    }
  }
}
