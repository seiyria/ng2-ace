'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AceEditorDirective = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _core = require('@angular/core');

var _brace = require('brace');

var _brace2 = _interopRequireDefault(_brace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AceEditorDirective = exports.AceEditorDirective = (_dec = (0, _core.Directive)({
  selector: '[ace-editor]',
  inputs: ['text', 'mode', 'theme', 'readOnly', 'options'],
  outputs: ['textChanged', 'editorRef']
}), _dec(_class = function () {
  _createClass(AceEditorDirective, [{
    key: 'options',
    set: function set(value) {
      this.editor.setOptions(value || {});
    }
  }, {
    key: 'readOnly',
    set: function set(value) {
      this._readOnly = value;
      this.editor.setReadOnly(value);
    }
  }, {
    key: 'theme',
    set: function set(value) {
      this._theme = value;
      this.editor.setTheme('ace/theme/' + value);
    }
  }, {
    key: 'mode',
    set: function set(value) {
      this._mode = value;
      this.editor.getSession().setMode('ace/mode/' + value);
    }
  }, {
    key: 'text',
    set: function set(value) {
      if (value === this.oldVal) return;
      this.editor.setValue(value);
      this.editor.clearSelection();
      this.editor.focus();
    }
  }], [{
    key: 'parameters',
    get: function get() {
      return [[_core.ElementRef]];
    }
  }]);

  function AceEditorDirective(elementRef) {
    var _this = this;

    _classCallCheck(this, AceEditorDirective);

    this.textChanged = new _core.EventEmitter();
    this.editorRef = new _core.EventEmitter();

    var el = elementRef.nativeElement;
    el.classList.add('editor');

    this.editor = _brace2.default.edit(el);

    setTimeout(function () {
      _this.editorRef.next(_this.editor);
    });

    this.editor.on('change', function () {
      var newVal = _this.editor.getValue();
      if (newVal === _this.oldVal) return;
      if (typeof _this.oldVal !== 'undefined') {
        _this.textChanged.next(newVal);
      }
      _this.oldVal = newVal;
    });
  }

  return AceEditorDirective;
}()) || _class);
