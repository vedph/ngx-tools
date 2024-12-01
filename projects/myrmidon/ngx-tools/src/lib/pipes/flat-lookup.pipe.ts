import { Pipe, PipeTransform } from '@angular/core';

/**
 * Flat lookup pipe. This is used to return a human-friendly
 * string from some lookup value, which can be a string or
 * a number, by looking up an array of objects having the
 * value key in one property and its corresponding label in
 * another property, or an object having a property for each
 * value key with a corresponding label value. Example:
 *   myKey | flatLookup:myMap
 * where myMap is either a map object e.g. { r: 'red' } or
 * an array of objects e.g. [{ id: 'r', label: 'red' }].
 */
@Pipe({ name: 'flatLookup' })
export class FlatLookupPipe implements PipeTransform {
  /**
   * Transform the key value into a string.
   *
   * @param value The key value to lookup.
   * @param map The map to lookup in. This can be an array
   * or an object.
   * @param keyName The name of the property corresponding
   * to the key in the map. Used only when map is an array
   * of objects.
   * @param valueName The name of the property corresponding
   * to the value in the map. Used only when map is an array
   * of objects.
   * @param fallback The fallback value to return when value
   * is not null/undefined and is not found. If not specified,
   * the value itself will be returned.
   * @returns The string corresponding to value, or value if
   * not found, or null if value is null/undefined.
   */
  public transform(
    value: string | number | undefined | null,
    map: Array<any> | Object | undefined | null,
    keyName = 'id',
    valueName = 'label',
    fallback?: string
  ): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    if (!map) {
      return fallback || value.toString();
    }

    if (Array.isArray(map)) {
      // array of objects with keyName=valueName
      if (!valueName) {
        return fallback || value.toString();
      }
      const m = map as Array<any>;
      const item = m.find((i) => i[keyName] === value);
      return item ? item[valueName] : fallback || value.toString();
    } else {
      // single object
      const m = map as any;
      return m[value] ? m[value] : fallback || value.toString();
    }
  }
}
