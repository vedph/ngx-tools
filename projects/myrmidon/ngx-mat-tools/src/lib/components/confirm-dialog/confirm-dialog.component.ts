import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

// https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41

@Component({
  // https://github.com/angular/components/issues/7718
  // selector: 'cadmus-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
})
export class ConfirmDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  public readonly title = signal('Confirm');
  public readonly prompt = signal('Confirm operation?');
  public readonly ok = signal('yes');
  public readonly cancel = signal('no');
}
