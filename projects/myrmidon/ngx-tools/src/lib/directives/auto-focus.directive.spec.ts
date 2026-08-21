import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  imports: [AutoFocusDirective],
  template: `<input autoFocus />`,
})
class HostComponent {}

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should focus the host element after view init', () => {
    fixture.detectChanges();

    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    expect(document.activeElement).toBe(input);
  });
});
