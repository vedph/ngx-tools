import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that converts a string to a color. The same string will always
 * return the same color. Colors are chosen from a palette; if you don't
 * specify one the default palette will be used. Usage example:
 *
 * <div [style.background-color]="someString | stringToColor : customColors">
 * {{ someString }}
 * </div>
 *
 * The palette must be an array of strings that are valid CSS colors like
 * '#ff0000' or 'red'. If you use this pipe to calculate e.g. a background
 * color and you want to set a readable constrasting color, you can use
 * the ColorToContrastPipe, e.g.:
 *
 * <div [ngStyle]="{'background-color': (someString | stringToColor : customColors),
 * 'color': (someString | stringToColor : customColors) | colorToContrast}">
 * {{ someString }}
 * </div>
 */
@Pipe({ name: 'stringToColor' })
export class StringToColorPipe implements PipeTransform {
  // default color palette
  private defaultColors = [
    '#FFB3BA',
    '#FFDFBA',
    '#FFFFBA',
    '#BAFFC9',
    '#BAE1FF',
    '#e0bbE4',
    '#957DAD',
    '#D291BC',
    '#FEC8D8',
    '#FFDFD3',
    '#B5EAD7',
    '#C7CEEA',
    '#FFDAC1',
    '#E2F0CB',
    '#B1C3D6',
    '#CBE2CF',
    '#C3C6B1',
    '#D6BEA9',
    '#FAF0E6',
    '#D3D3D3',
    '#E3DAC9',
    '#C2B280',
    '#967117',
    '#301934',
  ];

  public transform(
    value: string | null | undefined,
    colors: string[] = this.defaultColors
  ): string {
    // return first color for null or undefined
    if (!value) {
      return colors[0];
    }

    // calculate hash from string
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    // use the hash to index into the color array
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  }
}
