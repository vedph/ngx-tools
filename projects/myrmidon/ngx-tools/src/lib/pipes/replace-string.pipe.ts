import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that replaces occurrences of a string in input text.
 * Can operate in literal string or regex mode.
 * Usage: {{ value | replaceString:search:replacement:isRegex:caseSensitive }}
 * For instance:
 * - {{ 'Hello, world!' | replaceString:'world':'planet' }}
 * - {{ 'Hello, world!' | replaceString:'[aeiou]':'*' }}
 */
@Pipe({
  name: 'replaceString',
  standalone: true,
  pure: true,
})
export class ReplaceStringPipe implements PipeTransform {
  /**
   * Replaces text in a string.
   * @param value The input string.
   * @param search The string to search for or regex pattern.
   * @param replacement The replacement string.
   * @param isRegex If true, treats search as regex pattern; otherwise escapes it.
   * @param caseSensitive If false, makes the search case insensitive.
   * @returns The resulting string with replacements.
   */
  public transform(
    value: string | null | undefined,
    search: string,
    replacement: string,
    isRegex = false,
    caseSensitive = true
  ): string {
    if (!value || !search) return value || '';

    try {
      let flags = 'g';
      if (!caseSensitive) {
        flags += 'i';
      }

      const pattern = isRegex ? search : this.escapeRegExp(search);
      return value.replace(new RegExp(pattern, flags), replacement);
    } catch (e) {
      console.warn('ReplaceStringPipe: error during replacement', e);
      return value;
    }
  }

  /**
   * Escapes special regex characters to treat them as literals.
   */
  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
