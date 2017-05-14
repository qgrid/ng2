import {NgModule} from '@angular/core';
import {PagerModule} from './pagination';
import {ProgressModule} from './progress';

@NgModule({
  declarations: [
  ],
  exports: [
    PagerModule,
    ProgressModule
  ],
  imports: [
  ],
  providers: []
})
export class PluginModule {
}

