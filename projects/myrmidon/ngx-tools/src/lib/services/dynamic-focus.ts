import { NgZone } from '@angular/core';

/**
 * Parameters for focusing a DOM element.
 */
export interface FocusOptions {
  /** Element ID or selector to focus */
  target: string;
  /** Maximum number of attempts (default: 5) */
  maxAttempts?: number;
  /** Base delay in ms (default: 50) */
  baseDelay?: number;
  /** Whether to use exponential backoff (default: true) */
  useBackoff?: boolean;
  /** Callback when focus succeeds */
  onSuccess?: () => void;
  /** Callback when focus fails after all attempts */
  onFailure?: () => void;
}

/**
 * Helper class for reliably focusing DOM elements that may be
 * dynamically added.
 * Implements multiple focus attempts with exponential backoff
 * to handle elements that aren't immediately available in the
 * DOM. Usage:
 *
 * ```ts
 * import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
 * import { DynamicFocus } from '@myrmidon/cadmus-core';
 *
 * @Component({
 *   // ...
 * })
 * export class MyComponent implements OnInit, OnDestroy {
 *   private _focusHelper: DynamicFocus;
 *
 *   constructor(private _zone: NgZone) {
 *     this._focusHelper = new DynamicFocus(this._zone);
 *   }
 *
 *   public doSomething() {
 *     // some action that may add an element to the DOM}
 *     const cancelFocus = focusService.focusElement({
 *       target: '#my-element',
 *       maxAttempts: 3,
 *       baseDelay: 100,
 *       useBackoff: true,
 *       onSuccess: () => console.log('Focused!'),
 *       onFailure: () => console.log('Failed to focus!'),
 *     });
 *     // to cancel the focus request: cancelFocus();
 *   }
 * ```
 */
export class DynamicFocus {
  private _activeRequests = new Map<string, number>();

  /**
   * Creates a new DynamicFocus instance.
   * @param _zone Angular's NgZone (pass it from your component)
   */
  constructor(private _zone: NgZone) {}

  /**
   * Attempts to focus an element that might not be immediately available
   * in the DOM.
   * Uses multiple attempts with exponential backoff to ensure reliable
   * focusing.
   *
   * @param options Focus configuration options
   * @returns A function that can be called to cancel the focus request
   */
  public focusElement(options: FocusOptions): () => void {
    const {
      target,
      maxAttempts = 5,
      baseDelay = 50,
      useBackoff = true,
      onSuccess,
      onFailure,
    } = options;

    // generate a unique ID for this request
    const requestId = `${target}_${Date.now()}`;
    let attempts = 0;

    // clear any existing requests for this target
    this.cancelFocus(target);

    const attemptFocus = () => {
      // support both ID and CSS selector
      let element: HTMLElement | null;
      if (target.startsWith('#')) {
        element = document.querySelector(target) as HTMLElement;
      } else if (
        target.includes(' ') ||
        target.includes('.') ||
        target.includes('[')
      ) {
        element = document.querySelector(target) as HTMLElement;
      } else {
        element = document.getElementById(target);
      }

      if (element) {
        try {
          this._zone.runOutsideAngular(() => {
            element!.focus();

            // verify focus actually worked
            if (document.activeElement === element) {
              this._zone.run(() => {
                this._activeRequests.delete(requestId);
                if (onSuccess) onSuccess();
              });
            } else {
              scheduleNextAttempt();
            }
          });
        } catch (e) {
          console.warn(`Focus attempt for ${target} failed:`, e);
          scheduleNextAttempt();
        }
      } else {
        scheduleNextAttempt();
      }
    };

    const scheduleNextAttempt = () => {
      attempts++;

      if (attempts >= maxAttempts) {
        console.warn(`Failed to focus ${target} after ${maxAttempts} attempts`);
        this._activeRequests.delete(requestId);
        if (onFailure) onFailure();
        return;
      }

      // calculate delay with or without exponential backoff
      const delay = useBackoff
        ? Math.min(baseDelay * Math.pow(2, attempts - 1), 800)
        : baseDelay;

      const timeoutId = window.setTimeout(() => {
        attemptFocus();
      }, delay);

      this._activeRequests.set(requestId, timeoutId);
    };

    // start the first attempt
    attemptFocus();

    // return a function to cancel this focus request
    return () => {
      if (this._activeRequests.has(requestId)) {
        window.clearTimeout(this._activeRequests.get(requestId)!);
        this._activeRequests.delete(requestId);
      }
    };
  }
  /**
   * Cancels any pending focus attempts for the specified target.
   *
   * @param target The target element ID or selector
   */
  public cancelFocus(target: string): void {
    for (const [id, timeoutId] of this._activeRequests.entries()) {
      if (id.startsWith(`${target}_`)) {
        window.clearTimeout(timeoutId);
        this._activeRequests.delete(id);
      }
    }
  }

  /**
   * Cancels all pending focus attempts.
   */
  public cancelAllFocus(): void {
    for (const timeoutId of this._activeRequests.values()) {
      window.clearTimeout(timeoutId);
    }
    this._activeRequests.clear();
  }
}
