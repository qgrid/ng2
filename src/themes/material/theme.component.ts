import {Component} from '@angular/core';

const templates = [
  require('./templates/head-cell-text.tpl.html'),
  require('./templates/body-cell-text.tpl.html'),
  require('./templates/foot-cell-text.tpl.html'),
  require('./templates/toolbar-top.tpl.html'),
  require('./templates/toolbar-bottom.tpl.html'),
  require('./templates/toolbar-left.tpl.html'),
  require('./templates/toolbar-right.tpl.html'),
  require('./templates/plugin-pager.tpl.html'),
];

@Component({
  selector: 'q-grid-theme',
  template: templates.join('\n\n')
})
export class ThemeComponent {
  constructor() {
  }
}
