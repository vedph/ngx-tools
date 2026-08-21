import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefStub: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRefStub = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: dialogRefStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default title, prompt, ok and cancel labels', () => {
    expect(component.title()).toBe('Confirm');
    expect(component.prompt()).toBe('Confirm operation?');
    expect(component.ok()).toBe('yes');
    expect(component.cancel()).toBe('no');
  });

  it('should render the title and prompt', () => {
    component.title.set('Delete item');
    component.prompt.set('Are you sure?');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.textContent).toContain('Delete item');
    expect(host.textContent).toContain('Are you sure?');
  });

  it('should render the ok and cancel button labels', () => {
    component.ok.set('Confirm');
    component.cancel.set('Dismiss');
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Confirm');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('Dismiss');
  });

  it('should close with true when the ok button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    expect(dialogRefStub.close).toHaveBeenCalledWith(true);
  });

  it('should close with no value when the cancel button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click();
    expect(dialogRefStub.close).toHaveBeenCalledWith();
  });
});
