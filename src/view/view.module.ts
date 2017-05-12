import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridComponent, GridService} from './components/grid';
import {BoxCoreComponent} from './components/box';
import {ViewCoreComponent} from './components/view';
import {ToolbarCoreComponent} from './components/toolbar';
import {ColumnListComponent} from './components/column';
import {ThemeCoreComponent, ThemeService} from './components/theme';
import {BodyCoreComponent, TdCoreDirective} from './components/body';
import {HeadCoreComponent, ThCoreDirective} from './components/head';
import {FootCoreComponent, TfCoreDirective} from './components/foot';
import {TrCoreDirective} from './components/row';
import {VScrollService} from './components/scroll';
import {MarkupDirective, TemplateCacheDirective} from './directives';
import {BodyCellTextComponent, HeadCellTextComponent, FootCellTextComponent} from './components/cell/text';
import {TemplateCacheService} from '../template/template-cache.service';

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
  ],
  providers: [
    ThemeService,
    GridService,
    VScrollService,
    TemplateCacheService
  ]
})
export class ViewModule {
}
