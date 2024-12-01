import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

/**
 * Auto-focus directive for elements under the control of a structural
 * directive like *ngIf. Just add autoFocus to the desired element:
 * <input type="text" autoFocus *ngIf="isInputVisible">.
 */
@Directive({ selector: '[autoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);

  public ngAfterViewInit(): void {
    this._element.nativeElement.focus();
  }
}
