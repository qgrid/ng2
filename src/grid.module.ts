import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ThemeModule, Theme} from './themes/material';

import {GridComponent, GridService} from './view/components/grid';
import {BoxCoreComponent} from './view/components/box'
import {ViewCoreComponent} from './view/components/view'
import {ColumnListComponent} from './view/components/column';
import {ThemeCoreComponent, ThemeService} from './view/components/theme';

import {BodyCoreComponent, TdCoreDirective} from './view/components/body';
import {HeadCoreComponent, ThCoreDirective} from './view/components/head';
import {FootCoreComponent, TfCoreDirective} from './view/components/foot';
import {TrCoreDirective} from './view/components/row';
import {VScrollService} from "./view/components/scroll";

import {MarkupDirective, TemplateCacheDirective} from './view/directives';
import {TemplateCacheService} from './view/services';

import {BodyCellTextComponent, HeadCellTextComponent, FootCellTextComponent} from './view/components/cell/text';

import {ToolbarCoreComponent} from "./view/components/toolbar";

import {Model} from '@grid/core/infrastructure/model';
import {setup} from '@grid/core';
setup(Model);

@NgModule({
  declarations: [
    GridComponent,
    ColumnListComponent,
    BoxCoreComponent,
    ViewCoreComponent,
    ThemeCoreComponent,
    HeadCoreComponent,
    BodyCoreComponent,
    FootCoreComponent,
    TrCoreDirective,
    ThCoreDirective,
    TdCoreDirective,
    TfCoreDirective,
    MarkupDirective,
    TemplateCacheDirective,
    BodyCellTextComponent,
    HeadCellTextComponent,
    FootCellTextComponent,
    ToolbarCoreComponent
  ],
  exports: [
    GridComponent,
    ColumnListComponent
  ],
  imports: [
    BrowserModule,
    ThemeModule
  ],
  providers: [
    ThemeService,
    GridService,
    TemplateCacheService,
    VScrollService
  ]
})
export class GridModule {
  constructor(themeService: ThemeService, theme: Theme) {
    themeService.name = theme.name;
  }
}
