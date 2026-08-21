import {
  FieldValidator,
  LogicFn,
  PathKind,
  SchemaPath,
  SchemaPathRules,
  TreeValidationResult,
  validate,
  validateTree,
} from '@angular/forms/signals';

// https://angular.dev/guide/forms/signals/validation
// Signal-forms counterparts of NgxToolsValidators, meant to be called
// from within a schema(...) callback (see @angular/forms/signals `schema`).

/**
 * General-purpose custom validators for Angular signal forms.
 */
export class NgxToolsSignalValidators {
  private static hasValidLength(value: unknown): value is { length: number } {
    // non-strict comparison is intentional,
    // to check for both `null` and `undefined` values
    return value != null && typeof (value as any).length === 'number';
  }

  /**
   * Validate a string or array field for a minimum required length.
   * Differently from the standard `minLength` validator, this does
   * not exclude empty values from the check: the standard validator
   * skips validation when the value has no length, while this one
   * treats a missing/empty value as a length of 0.
   *
   * @param path Path of the field to validate.
   * @param minLength Minimum length required.
   * @param config Optional user-facing message for the error.
   */
  public static strictMinLength<
    TValue extends { length: number } | null | undefined,
    TPathKind extends PathKind = PathKind.Root,
  >(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
    minLength: number,
    config?: { message?: string | LogicFn<TValue, string, TPathKind> },
  ): void {
    validate(path, (ctx) => {
      const value = ctx.value();
      if (!NgxToolsSignalValidators.hasValidLength(value)) {
        return null;
      }
      if (value.length >= minLength) {
        return null;
      }
      const message =
        typeof config?.message === 'function'
          ? config.message(ctx)
          : config?.message;
      return {
        kind: 'strictMinLength',
        message,
        requiredLength: minLength,
        actualLength: value.length,
      };
    });
  }

  /**
   * Apply the given validation logic to a field only when `predicate`
   * returns true. Useful to reuse the same custom `validate` logic
   * under different conditions.
   *
   * @param path Path of the field to validate.
   * @param predicate Function receiving the field context, returning
   * true when `logic` should be applied.
   * @param logic The validation logic to apply conditionally.
   */
  public static conditional<TValue, TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
    predicate: LogicFn<TValue, boolean, TPathKind>,
    logic: FieldValidator<TValue, TPathKind>,
  ): void {
    validate(path, (ctx) => (predicate(ctx) ? logic(ctx) : null));
  }

  /**
   * Validate that at least one of the given sibling fields has a value
   * (consistent with the `required` validator's logic).
   * Usage:
   * ```ts
   * const mySchema = schema<MyModel>((path) => {
   *   NgxToolsSignalValidators.atLeastOneRequired(path, [path.alt1, path.alt2]);
   * });
   * ```
   *
   * @param path Path of the group field to attach the validator to.
   * @param paths The sibling fields to check.
   * @returns Null if at least one field has a value, else an
   * 'atLeastOneRequired' error on `path`.
   */
  public static atLeastOneRequired<
    TValue,
    TPathKind extends PathKind = PathKind.Root,
  >(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
    paths: readonly SchemaPath<any, SchemaPathRules.Supported, PathKind.Child>[],
  ): void {
    validateTree(path, (ctx): TreeValidationResult => {
      const hasValue = paths.some((p) => {
        const state = ctx.stateOf(p);

        // ignore disabled fields
        if (state.disabled()) {
          return false;
        }

        // consistency with the required validator:
        // a value is present when != null, != '', and (if an array)
        // has at least 1 item
        const value = state.value();
        return (
          value !== null &&
          value !== undefined &&
          value !== '' &&
          (Array.isArray(value) ? value.length > 0 : true)
        );
      });

      return hasValue ? null : { kind: 'atLeastOneRequired' };
    });
  }
}
