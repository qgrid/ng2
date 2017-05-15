import {NgModule} from '@angular/core';
import {MainModule} from './main';
import {ThemeService as Theme} from './themes/material/theme.service';
import {ThemeService, TemplateLinkService} from './template';
import {Model} from '@grid/core/infrastructure';
import {setup} from '@grid/core';
import {GridComponent} from "./main/grid";
import {ColumnListComponent} from "./main/column";

@NgModule({
  declarations: [
  ],
  exports: [
    GridComponent,
    ColumnListComponent
  ],
  imports: [
    MainModule
  ],
  providers: [
    TemplateLinkService,
    ThemeService
  ]
})
export class GridModule {
  constructor(themeService: ThemeService, theme: Theme) {
    setup(Model);
    themeService.name = theme.name;
  }
}
