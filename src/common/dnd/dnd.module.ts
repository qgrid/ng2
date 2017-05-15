import {NgModule} from '@angular/core';
import {DragDirective} from './drag.directive';
import {DropDirective} from './drop.directive';

@NgModule({
  declarations: [
    DragDirective,
    DropDirective
  ],
  exports: [
    DragDirective,
    DropDirective
  ],
  imports: [
  ],
  providers: [
  ]
})
export class DndModule {
}
