import {NgModule} from '@angular/core';
import {GridComponent} from './ng2/components/grid';

@NgModule({
  declarations: [
    GridComponent
  ],
  exports: [
    GridComponent
  ],
  imports: [],
  providers: []
})
export class GridModule {
  constructor() {
  }
}
