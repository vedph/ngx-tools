import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DynamicFocus } from './dynamic-focus';

describe('DynamicFocus', () => {
  let zone: NgZone;
  let focus: DynamicFocus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    zone = TestBed.inject(NgZone);
    focus = new DynamicFocus(zone);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('should focus an already-present element immediately', () => {
    const input = document.createElement('input');
    input.id = 'target';
    document.body.appendChild(input);

    const onSuccess = vi.fn();
    const onFailure = vi.fn();

    focus.focusElement({ target: 'target', onSuccess, onFailure });

    expect(document.activeElement).toBe(input);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('should focus an element matching a CSS selector', () => {
    const input = document.createElement('input');
    input.className = 'my-input';
    document.body.appendChild(input);

    const onSuccess = vi.fn();

    focus.focusElement({ target: '.my-input', onSuccess });

    expect(document.activeElement).toBe(input);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should retry with a delay when the element is not yet present, then succeed', () => {
    const onSuccess = vi.fn();

    focus.focusElement({
      target: 'late-target',
      baseDelay: 10,
      useBackoff: false,
      onSuccess,
    });

    expect(onSuccess).not.toHaveBeenCalled();

    const input = document.createElement('input');
    input.id = 'late-target';
    document.body.appendChild(input);

    vi.advanceTimersByTime(10);

    expect(document.activeElement).toBe(input);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should give up and call onFailure after maxAttempts', () => {
    const onSuccess = vi.fn();
    const onFailure = vi.fn();

    focus.focusElement({
      target: 'missing-target',
      maxAttempts: 3,
      baseDelay: 10,
      useBackoff: false,
      onSuccess,
      onFailure,
    });

    // 2 more attempts are scheduled after the initial synchronous one
    vi.advanceTimersByTime(10);
    vi.advanceTimersByTime(10);

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onFailure).toHaveBeenCalledTimes(1);
  });

  it('should cancel a pending focus request', () => {
    const onSuccess = vi.fn();
    const onFailure = vi.fn();

    const cancel = focus.focusElement({
      target: 'never-appears',
      maxAttempts: 3,
      baseDelay: 10,
      useBackoff: false,
      onSuccess,
      onFailure,
    });

    cancel();
    vi.advanceTimersByTime(1000);

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('should cancel a previous request for the same target when a new one starts', () => {
    const firstFailure = vi.fn();
    const secondSuccess = vi.fn();

    focus.focusElement({
      target: 'shared-target',
      maxAttempts: 2,
      baseDelay: 10,
      useBackoff: false,
      onFailure: firstFailure,
    });

    // starting a new request for the same target cancels the pending one
    focus.focusElement({
      target: 'shared-target',
      maxAttempts: 2,
      baseDelay: 10,
      useBackoff: false,
      onSuccess: secondSuccess,
    });

    const input = document.createElement('input');
    input.id = 'shared-target';
    document.body.appendChild(input);

    vi.advanceTimersByTime(10);

    expect(secondSuccess).toHaveBeenCalledTimes(1);
    expect(firstFailure).not.toHaveBeenCalled();
  });
});
