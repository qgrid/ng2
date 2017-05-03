import {Directive} from '@angular/core';
import {ViewCoreComponent} from "../view/view-core.component";

@Directive({
  selector: '[q-grid-core-head]'
})
export class HeadCoreDirective {
  constructor(public $view: ViewCoreComponent) {
  }
}
