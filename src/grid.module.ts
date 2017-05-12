import {NgModule} from '@angular/core';
import {ThemeModule, Theme} from './themes/material';
import {ViewModule} from './view';

import {Model} from '@grid/core/infrastructure/model';
import {setup} from '@grid/core';
import {ThemeService} from "./view/components/theme/theme.service";

setup(Model);

@NgModule({
  declarations: [
  ],
  exports: [
    ViewModule
  ],
  imports: [
    ViewModule,
    ThemeModule
  ],
  providers: [
  ]
})
export class GridModule {
  constructor(themeService: ThemeService, theme: Theme) {
    themeService.name = theme.name;
  }
}
