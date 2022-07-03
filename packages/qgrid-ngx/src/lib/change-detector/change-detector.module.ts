import { NgModule } from '@angular/core';
import { DirtyHostDirective } from './dirty-host.directive';
import { DirtyDirective } from './dirty.directive';

@NgModule({
  declarations: [
    DirtyDirective,
    DirtyHostDirective,
  ],
  exports: [
    DirtyDirective,
    DirtyHostDirective,
  ],
})
export class ChangeDetectorModule {
}
