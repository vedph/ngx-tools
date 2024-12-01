import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that converts a color to a contrasting color (black or white).
 * Usage example:
 * <div [ngStyle]="{'background-color': (someString | stringToColor : customColors),
 * 'color': (someString | stringToColor : customColors) | colorToContrast}">
 * {{ someString }}
 * </div>
 */
@Pipe({ name: 'colorToContrast' })
export class ColorToContrastPipe implements PipeTransform {
  public transform(value: string | null | undefined): string {
    // return black for null or undefined
    if (!value) {
      return '#000000';
    }

    // convert hex color to RGB
    const rgb = parseInt(value.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // calculate the brightness of the color
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // return white for dark colors and black for light colors
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}
