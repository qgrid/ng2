import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridComponent, GridService} from './components/grid';
import {ColumnListComponent} from './components/column';
import {ThemeModule} from '../themes/material/theme.module';
import {ViewCoreModule} from '../view-core';
import {BoxComponent} from './components/box';

@NgModule({
  declarations: [
    GridComponent,
    ColumnListComponent,
    BoxComponent
  ],
  exports: [
    GridComponent,
    ColumnListComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    ViewCoreModule,
    ThemeModule
  ],
  providers: [
    GridService
  ]
})
export class ViewModule {
}
