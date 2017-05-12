import {NgModule} from '@angular/core';
import {ViewModule} from './view';
import {ThemeService as Theme} from './themes/material/theme.service';
import {ThemeService, TemplateLinkService} from './template';
import {Model} from '@grid/core/infrastructure';
import {setup} from '@grid/core';
import {GridComponent} from "./view/components/grid";
import {ColumnListComponent} from "./view/components/column";

@NgModule({
  declarations: [
  ],
  exports: [
    GridComponent,
    ColumnListComponent
  ],
  imports: [
    ViewModule
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
