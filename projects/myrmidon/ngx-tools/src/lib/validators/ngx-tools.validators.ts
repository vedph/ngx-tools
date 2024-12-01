import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

// https://github.com/angular/angular/blob/3b7d4ebbd6445364889d61b7b1b1c65206534d34/packages/forms/src/validators.ts
// https://indepth.dev/posts/1319/the-best-way-to-implement-custom-validators

/**
 * General-purpose custom validators.
 */
// @dynamic
export class NgxToolsValidators {
  private static hasValidLength(value: any): boolean {
    // non-strict comparison is intentional,
    // to check for both `null` and `undefined` values
    return value != null && typeof value.length === 'number';
  }

  /**
   * Validate an array or string or FormArray for a minimum required
   * length.
   * Differently from the standard minLength validator, this does
   * not exclude 0 from the values to be checked. The standard
   * validator instead does not validate the value if this is 0.
   *
   * @param minLength Minimum length required.
   * @returns Null if valid, else an object with minlength with
   * requiredLength and actualLength.
   */
  public static strictMinLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // don't validate values without length property,
      // except for FormArray instances, where we validate its length
      // (=number of children controls, assuming that the client
      // has added a control in the array -usually a FormGroup- for each
      // item to edit)
      let length: number;
      if (control instanceof FormArray) {
        length = (control as FormArray).length;
      } else {
        if (!this.hasValidLength(control.value)) {
          return null;
        }
        length = control.value.length;
      }

      return length < minLength
        ? {
            minlength: {
              requiredLength: minLength,
              actualLength: control.value.length,
            },
          }
        : null;
    };
  }

  /**
   * Conditionally validate using the specified validator
   * when predicate is true.
   * See https://medium.com/ngx/3-ways-to-implement-conditional-validation-of-reactive-forms-c59ed6fc3325.
   *
   * @param predicate The predicate function to use when determining
   * if the validator should be used.
   * @param validator The conditional validator to use.
   * @returns Validation results.
   */
  public static conditionalValidator(
    predicate: () => boolean,
    validator: ValidatorFn
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      if (predicate()) {
        return validator(control);
      }
      return null;
    };
  }
}
