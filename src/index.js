
import { Directive, ElementRef, EventEmitter } from '@angular/core';
import ace from 'brace';

@Directive({
  selector: '[ace-editor]',
  inputs: ['text', 'mode', 'theme', 'readOnly', 'options'],
  outputs: ['textChanged', 'editorRef']
})
export class AceEditorDirective {
  static get parameters() {
    return [[ElementRef]];
  }

  set options(value) {
    this.editor.setOptions(value || {});
  }

  set readOnly(value) {
    this._readOnly = value;
    this.editor.setReadOnly(value);
  }

  set theme(value) {
    this._theme = value;
    this.editor.setTheme(`ace/theme/${value}`);
  }

  set mode(value) {
    this._mode = value;
    this.editor.getSession().setMode(`ace/mode/${value}`);
  }

  set text(value) {
    if(value === this.oldVal) return;
    this.editor.setValue(value);
    this.editor.clearSelection();
    this.editor.focus();
  }

  constructor(elementRef) {
    this.textChanged = new EventEmitter();
    this.editorRef = new EventEmitter();

    const el = elementRef.nativeElement;
    el.classList.add('editor');

    this.editor = ace.edit(el);

    setTimeout(() => {
      this.editorRef.next(this.editor);
    });

    this.editor.on('change', () => {
      const newVal = this.editor.getValue();
      if(newVal === this.oldVal) return;
      if(typeof this.oldVal !== 'undefined') {
        this.textChanged.next(newVal);
      }
      this.oldVal = newVal;
    });
  }
}
