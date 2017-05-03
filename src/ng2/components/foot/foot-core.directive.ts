import {Directive} from '@angular/core';
import {ViewCoreComponent} from "../view/view-core.component";

@Directive({
  selector: '[q-grid-core-foot]'
})
export class FootCoreDirective {
  constructor(public $view: ViewCoreComponent) {
  }
}
