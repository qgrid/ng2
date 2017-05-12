import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ThemeModule, ThemeService as Theme} from './themes/material';
import {ViewModule} from './view';
import {GridComponent, GridService} from './view/components/grid';
import {ColumnListComponent} from './view/components/column';
import {Model} from '@grid/core/infrastructure';
import {setup} from '@grid/core';
import {
  ThemeService,
  TemplateLinkService
} from './template';

setup(Model);

@NgModule({
  declarations: [
    GridComponent,
    ColumnListComponent
  ],
  exports: [
    GridComponent,
    ColumnListComponent
  ],
  imports: [
    ViewModule,
    ThemeModule,
    BrowserModule
  ],
  providers: [
    GridService,
    TemplateLinkService,
    ThemeService
  ]
})
export class GridModule {
  constructor(themeService: ThemeService, theme: Theme) {
    themeService.name = theme.name;
  }
}
