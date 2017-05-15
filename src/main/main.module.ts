import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridComponent, GridService} from './grid';
import {ColumnListComponent} from './column';
import {BoxComponent} from './box';
import {CoreModule} from './core';
import {ThemeModule} from '@grid/theme/theme.module';

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
    CoreModule,
    ThemeModule
  ],
  providers: [
    GridService
  ]
})
export class MainModule {
}
