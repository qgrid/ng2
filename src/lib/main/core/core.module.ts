import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCoreComponent } from './view/view-core.component';
import { ToolbarCoreComponent } from './toolbar/toolbar-core.component';
import { BodyCoreComponent } from './body/body-core.component';
import { TdCoreDirective } from './body/td-core.directive';
import { HeadCoreComponent } from './head/head-core.component';
import { ThCoreDirective } from './head/th-core.directive';
import { FootCoreComponent } from './foot/foot-core.component';
import { TfCoreDirective } from './foot/tf-core.directive';
import { CellHandlerComponent } from './cell/cell-handler.component';
import { TrCoreDirective } from './row/tr-core.directive';
import { VScrollService } from './scroll/vscroll.service';
import { MarkupDirective } from './markup/markup.directive';
import { TemplateCacheService } from '../../template/template-cache.service';
import { TemplateService } from '../../template/template.service';
import { TemplateModule } from '../../template/template.module';
import { CommonModule as GridCommonModule } from '../../common/common.module';
import { TableCoreComponent } from '../../main/core/table/table-core.component';
import { TdCoreAlignDirective } from '../../main/core/body/td-core-align.directive';
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
