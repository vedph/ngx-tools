import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
// import { RouterOutlet } from '@angular/router';
import {
  ColorToContrastPipe,
  EllipsisPipe,
  EnvService,
  FlatLookupPipe,
  ReplaceStringPipe,
} from '@myrmidon/ngx-tools';
import { DialogService, ThemeToggleComponent } from '@myrmidon/ngx-mat-tools';
import { MatAnchor } from '@angular/material/button';

interface Pair {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // RouterOutlet,
    ReactiveFormsModule,
    FlatLookupPipe,
    EllipsisPipe,
    ColorToContrastPipe,
    ReplaceStringPipe,
    ThemeToggleComponent,
    MatAnchor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly version: string;
  public readonly objMap: WritableSignal<Record<string, string>>;
  public readonly arrMap: WritableSignal<Pair[]>;
  public readonly key: WritableSignal<string>;
  public readonly colors: WritableSignal<string[]>;

  public text: FormControl<string | null>;
  public limit: FormControl<number>;
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    env: EnvService,
    private dialogService: DialogService,
  ) {
    this.version = env.get('version', 'NOT-SET')!;

    this.objMap = signal({ r: 'red', g: 'green', b: 'blue' });
    this.arrMap = signal([
      { id: 'r', label: 'red' },
      { id: 'g', label: 'green' },
      { id: 'b', label: 'blue' },
    ]);
    this.key = signal('r');

    const baseColors = [
      'black',
      'white',
      'red',
      'green',
      'blue',
      'yellow',
      'purple',
      'orange',
      'pink',
      'brown',
      'gray',
      'cyan',
      'magenta',
      'lime',
      'navy',
      'maroon',
      'olive',
      'teal',
      'silver',
      'gold',
    ];
    this.colors = signal([
      ...baseColors,
      ...Array.from({ length: 10 }, () => this.getRandomColor()),
    ]);

    this.text = formBuilder.control(
      'This is a sample text, used to test the ellipsis pipe. ' +
        'You can try with different texts, or change the limit.',
    );
    this.limit = formBuilder.control(15, { nonNullable: true });
    this.form = formBuilder.group({
      text: this.text,
      limit: this.limit,
    });
  }

  private getRandomColor(): string {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }

  public confirmDialog(): void {
    this.dialogService
      .confirm('Confirm', 'Are you sure?')
      .subscribe((result) => {
        if (result) {
          console.log('Confirmed');
        } else {
          console.log('Cancelled');
        }
      });
  }
}
