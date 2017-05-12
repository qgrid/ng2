import {Component} from '@angular/core';

const templates = [
  require('./templates/head-cell-text.tpl.html'),
  require('./templates/body-cell-text.tpl.html'),
  require('./templates/foot-cell-text.tpl.html')
];

@Component({
  selector: 'q-grid-theme',
  template: templates.join('\n\n')
})
export class ThemeComponent {
  constructor() {
  }
}
