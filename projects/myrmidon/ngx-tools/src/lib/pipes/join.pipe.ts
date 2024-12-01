import { Pipe, PipeTransform } from '@angular/core';

/**
 * Array joiner pipe.
 * Usage: "array | join". Arguments: separator (default=,) and limit (default=0
 * i.e. no limit; otherwise, limit the join to the first limit elements).
 */
@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
  public transform(
    value?: Array<any>,
    separator = ',',
    limit = 0
  ): string | null {
    if (!value) {
      return null;
    }
    return (limit ? value.slice(0, limit) : value).join(separator);
  }
}
