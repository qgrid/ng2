import {NgModule} from '@angular/core';
import {GridComponent} from './ng2/components/grid';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [GridComponent],
  exports: [GridComponent],
  imports: [BrowserModule],
  providers: []
})
export class GridModule {
  constructor() {
  }
}
