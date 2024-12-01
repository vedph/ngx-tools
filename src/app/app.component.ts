import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
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
  }
}
