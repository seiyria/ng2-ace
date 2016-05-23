# ng2-ace
A basic ace editor directive for angular 2.

# Install
`npm i -s ng2-ace`

# Sample Usage

```js
import { Component } from 'angular2/core';

import { AceEditorDirective } from 'ng2-ace';

import 'brace/theme/clouds';
import 'brace/mode/sql';

@Component({
  directives: [AceEditorDirective],
  template: `
  <div ace-editor
       [text]="text"
       [mode]="'sql'"
       [theme]="'clouds'"
       [options]="options"
       [readOnly]="false"
       (textChanged)="onChange($event)"
       style="display:block; height: 80vh; width:100%"></div>
  `
})
export class MyComponent {
  constructor() {
    this.text = 'test';
    this.options = { printMargin: false };
    this.onChange = (data) => {
      console.log(data);
    }
  }
}
```
Important pieces to note in the HTML template: `[ace-editor]` attribute, `[text]`, `[theme]`, `[mode]`, `[readOnly]`, `[options]` inputs, `(textChanged)` output. As per Ace, you must also make it a `display: block;` and give it a width and height.
