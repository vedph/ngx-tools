import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { DialogService } from './dialog.service';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

describe('DialogService', () => {
  let service: DialogService;
  let componentInstance: {
    title: ReturnType<typeof signal<string>>;
    prompt: ReturnType<typeof signal<string>>;
    ok: ReturnType<typeof signal<string>>;
    cancel: ReturnType<typeof signal<string>>;
  };
  let dialogOpen: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    componentInstance = {
      title: signal(''),
      prompt: signal(''),
      ok: signal(''),
      cancel: signal(''),
    };
    const dialogRefStub = {
      componentInstance,
      afterClosed: () => of(true),
    } as unknown as MatDialogRef<ConfirmDialogComponent>;

    dialogOpen = vi.fn().mockReturnValue(dialogRefStub);

    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: { open: dialogOpen } }],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('opens a ConfirmDialogComponent', () => {
    service.confirm('Title', 'Prompt?').subscribe();
    expect(dialogOpen).toHaveBeenCalledWith(ConfirmDialogComponent);
  });

  it('sets the title and prompt on the dialog component', () => {
    service.confirm('Title', 'Prompt?').subscribe();
    expect(componentInstance.title()).toBe('Title');
    expect(componentInstance.prompt()).toBe('Prompt?');
  });

  it('defaults the ok/cancel labels to yes/no', () => {
    service.confirm('Title', 'Prompt?').subscribe();
    expect(componentInstance.ok()).toBe('yes');
    expect(componentInstance.cancel()).toBe('no');
  });

  it('uses custom ok/cancel labels when provided', () => {
    service.confirm('Title', 'Prompt?', 'Confirm', 'Dismiss').subscribe();
    expect(componentInstance.ok()).toBe('Confirm');
    expect(componentInstance.cancel()).toBe('Dismiss');
  });

  it('resolves with the value emitted by afterClosed', async () => {
    const result = await new Promise((resolve) =>
      service.confirm('Title', 'Prompt?').subscribe(resolve),
    );
    expect(result).toBe(true);
  });
});
