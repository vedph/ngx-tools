import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
// import { RouterOutlet } from '@angular/router';
import {
  ColorToContrastPipe,
  EllipsisPipe,
  FlatLookupPipe,
} from '../../projects/myrmidon/ngx-tools/src/public-api';

interface Pair {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    FlatLookupPipe,
    EllipsisPipe,
    ColorToContrastPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public objMap: any;
  public arrMap: Pair[];
  public key: string;

  public text: FormControl<string | null>;
  public limit: FormControl<number>;
  public form: FormGroup;

  public colors = [
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

  constructor(formBuilder: FormBuilder) {
    // maps
    this.objMap = {
      r: 'red',
      g: 'green',
      b: 'blue',
    };

    this.arrMap = [];
    this.arrMap.push({
      id: 'r',
      label: 'red',
    });
    this.arrMap.push({
      id: 'g',
      label: 'green',
    });
    this.arrMap.push({
      id: 'b',
      label: 'blue',
    });
    this.key = 'r';

    // form
    this.text = formBuilder.control(
      'This is a sample text, used to test the ellipsis pipe. ' +
        'You can try with different texts, or change the limit.'
    );
    this.limit = formBuilder.control(15, { nonNullable: true });
    this.form = formBuilder.group({
      text: this.text,
      limit: this.limit,
    });

    // add 10 more random colors
    for (let i = 0; i < 10; i++) {
      this.colors.push(this.getRandomColor());
    }
  }

  private getRandomColor(): string {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }
}
