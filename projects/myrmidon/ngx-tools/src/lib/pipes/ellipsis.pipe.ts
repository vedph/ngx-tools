import { Pipe, PipeTransform } from '@angular/core';

/**
 * Ellipsis pipe. This cuts a string longer than limit,
 * either at limit or at some position before/after it
 * within an extent of 10% of the specified limit,
 * according to the delimiter characters found in that
 * span. Example:
 *   myText | ellipsis:50:true:'!?.;:,':' ...'
 * or just:
 *   myText | ellipsis.
 */
@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
  private findDelimIndexWithin(
    text: string,
    index: number,
    limit: number,
    delims: string
  ): number {
    if (delims.includes(text.charAt(index))) {
      return index + 1;
    }
    for (let i = -limit; i <= limit; i++) {
      if (delims.includes(text.charAt(index + i))) {
        return index + i + 1;
      }
    }
    return index;
  }

  private appendSuffix(
    text: string,
    suffix: string | undefined | null
  ): string {
    if (!suffix?.length) {
      return text;
    }
    const m = /^(\s+)/.exec(suffix);
    if (m) {
      return text.substring(0, text.length - m[1].length) + suffix;
    }
    return text + suffix;
  }

  /**
   * Transform the specified string cutting it when its length
   * exceeds a specified limit.
   *
   * @param value The string to cut.
   * @param limit The maximum count of characters.
   * @param smart True to try cut at a delimiter around limit.
   * @param delims A string with all the delimiter characters.
   * @param suffix The suffix to append to the end of the result.
   * If the suffix starts with a whitespace, the resulting text
   * is trimmed at end before appending this suffix.
   * @returns The string, cut if exceeding limit.
   */
  public transform(
    value: string | null | undefined,
    limit = 50,
    smart = true,
    delims = '!?.;:,',
    suffix = ' ...'
  ): string | null {
    if (!value) {
      return null;
    }
    if (value.length <= limit) {
      return value;
    }
    if (smart) {
      let i = this.findDelimIndexWithin(value, limit, limit / 10, delims);
      return this.appendSuffix(value.substring(0, i), suffix);
    } else {
      return this.appendSuffix(value.substring(0, limit), suffix);
    }
  }
}
