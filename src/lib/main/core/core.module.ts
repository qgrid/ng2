import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyCoreComponent } from './body/body-core.component';
import { CellHandlerComponent } from './cell/cell-handler.component';
import { CommonModule as GridCommonModule } from '../../common/common.module';
import { FootCoreComponent } from './foot/foot-core.component';
import { HeadCoreComponent } from './head/head-core.component';
import { LayerCoreComponent } from './layer/layer-core.component';
import { LayerCoreDirective } from './layer/layer-core.directive';
import { MarkupDirective } from './markup/markup.directive';
import { TableCoreComponent } from '../../main/core/table/table-core.component';
import { TdCoreAlignDirective } from '../../main/core/body/td-core-align.directive';
import { TdCoreDirective } from './body/td-core.directive';
import { TemplateCacheService } from '../../template/template-cache.service';
import { TemplateModule } from '../../template/template.module';
import { TemplateService } from '../../template/template.service';
import { TfCoreDirective } from './foot/tf-core.directive';
import { ThCoreDirective } from './head/th-core.directive';
import { ToolbarCoreComponent } from './toolbar/toolbar-core.component';
import { TrCoreDirective } from './row/tr-core.directive';
import { TrhCoreDirective } from './row/trh-core.directive';
import { ViewCoreComponent } from './view/view-core.component';
import { VScrollService } from './scroll/vscroll.service';

@NgModule({
	declarations: [
		BodyCoreComponent,
		CellHandlerComponent,
		FootCoreComponent,
		HeadCoreComponent,
		LayerCoreComponent,
		LayerCoreDirective,
		MarkupDirective,
		TableCoreComponent,
		TdCoreAlignDirective,
		TdCoreDirective,
		TfCoreDirective,
		ThCoreDirective,
		ToolbarCoreComponent,
		TrCoreDirective,
		TrhCoreDirective,
		ViewCoreComponent,
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
