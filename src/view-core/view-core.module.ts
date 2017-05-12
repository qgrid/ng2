import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ViewCoreComponent} from './components/view';
import {ToolbarCoreComponent} from './components/toolbar';
import {BodyCoreComponent, TdCoreDirective} from './components/body';
import {HeadCoreComponent, ThCoreDirective} from './components/head';
import {FootCoreComponent, TfCoreDirective} from './components/foot';
import {TrCoreDirective} from './components/row';
import {VScrollService} from './components/scroll';
import {MarkupDirective, TemplateCacheDirective} from './directives';
import {TemplateCacheService} from '../template';
import {TemplateDirective} from "../template/template.directive";

@NgModule({
  declarations: [
    ViewCoreComponent,
    HeadCoreComponent,
    BodyCoreComponent,
    FootCoreComponent,
    ToolbarCoreComponent,
    TrCoreDirective,
    ThCoreDirective,
    TdCoreDirective,
    TfCoreDirective,
    TemplateDirective,
    TemplateCacheDirective,
    MarkupDirective
  ],
  exports: [
    ViewCoreComponent,
    ToolbarCoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    VScrollService,
    TemplateCacheService
  ]
})
export class ViewCoreModule {
}
