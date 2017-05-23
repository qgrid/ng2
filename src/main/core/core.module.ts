import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ViewCoreComponent} from './view';
import {ToolbarCoreComponent} from './toolbar';
import {BodyCoreComponent, TdCoreDirective} from './body';
import {HeadCoreComponent, ThCoreDirective} from './head';
import {FootCoreComponent, TfCoreDirective} from './foot';
import {TrCoreDirective} from './row';
import {VScrollService} from './scroll';
import {MarkupDirective} from './markup';
import {TemplateCacheService} from '@grid/template';
import {TemplateModule} from "@grid/template/template.module";
import {CommonModule} from "@grid/common";
import {TableCoreComponent} from "@grid/main/core/table";

@NgModule({
  declarations: [
    ViewCoreComponent,
    TableCoreComponent,
    HeadCoreComponent,
    BodyCoreComponent,
    FootCoreComponent,
    ToolbarCoreComponent,
    TrCoreDirective,
    ThCoreDirective,
    TdCoreDirective,
    TfCoreDirective,
    MarkupDirective
  ],
  exports: [
    ViewCoreComponent,
    ToolbarCoreComponent
  ],
  imports: [
    BrowserModule,
    TemplateModule,
    CommonModule
  ],
  providers: [
    VScrollService,
    TemplateCacheService
  ]
})
export class CoreModule {
}
