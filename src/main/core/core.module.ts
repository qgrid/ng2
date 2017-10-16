import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ViewCoreComponent } from './view';
import { ToolbarCoreComponent } from './toolbar';
import { BodyCoreComponent, TdCoreDirective } from './body';
import { HeadCoreComponent, ThCoreDirective } from './head';
import { FootCoreComponent, TfCoreDirective } from './foot';
import { TrCoreDirective } from './row';
import { VScrollService } from './scroll';
import { MarkupDirective } from './markup';
import { TemplateCacheService } from 'ng2-qgrid/template';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { CommonModule } from 'ng2-qgrid/common';
import { TableCoreComponent } from 'ng2-qgrid/main/core/table';
import { ScrollbarDirective } from 'ng2-qgrid/main/core/scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

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
		MarkupDirective,
		ScrollbarDirective
	],
	exports: [
		ViewCoreComponent,
		ToolbarCoreComponent
	],
	imports: [
		BrowserModule,
		TemplateModule,
		CommonModule,
		PerfectScrollbarModule.forChild()
	],
	providers: [
		VScrollService,
		TemplateCacheService
	]
})
export class CoreModule {
}
