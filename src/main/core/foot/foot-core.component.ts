import {Component} from '@angular/core';
import {ViewCoreService} from '../view/view-core.service';

@Component({
  selector: 'tfoot[q-grid-core-foot]',
  templateUrl: './foot-core.component.html'
})
export class FootCoreComponent {
  constructor(public $view: ViewCoreService) {
  }
}
