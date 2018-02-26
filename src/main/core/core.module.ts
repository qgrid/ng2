import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCoreComponent } from './view';
import { ToolbarCoreComponent } from './toolbar';
import { BodyCoreComponent, TdCoreDirective } from './body';
import { HeadCoreComponent, ThCoreDirective } from './head';
import { FootCoreComponent, TfCoreDirective } from './foot';
import { CellHandlerComponent } from './cell';
import { TrCoreDirective } from './row';
import { VScrollService } from './scroll';
import { MarkupDirective } from './markup';
import { TemplateCacheService } from 'ng2-qgrid/template/template-cache.service';
import { TemplateService } from 'ng2-qgrid/template/template.service';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { CommonModule as GridCommonModule } from 'ng2-qgrid/common';
import { TableCoreComponent } from 'ng2-qgrid/main/core/table';
import { TdCoreAlignDirective } from 'ng2-qgrid/main/core/body/td-core-align.directive';
import { LayerCoreComponent } from './layer/layer-core.component';
import { LayerCoreDirective } from './layer/layer-core.directive';

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
		TdCoreAlignDirective,
		CellHandlerComponent,
		LayerCoreComponent,
		LayerCoreDirective
	],
	exports: [
		ViewCoreComponent,
		ToolbarCoreComponent
	],
	imports: [		
		TemplateModule,
		CommonModule,
		GridCommonModule
	],
	providers: [
		VScrollService,
		TemplateCacheService,
		TemplateService
	]
})
export class CoreModule {
}
