import { NgModule, NgZone } from '@angular/core';
import { DatePipe, DecimalPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { Fastdom } from '@qgrid/core/services/fastdom';
import { FormatService } from '@qgrid/core/format/format.service';
import { GridComponent } from './grid.component';
import { TemplateModule } from '../template/template.module';
import { ThemeModule } from '../theme/theme.module';
import { GridModelBuilder } from './grid-model.builder';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ViewModule } from '../view/view.module';
import { LayerModule } from '../layer/layer.module';
import { BoxModule } from '../box/box.module';
import { ScrollModule } from '../scroll/scroll.module';
import { Grid } from './grid';
import { MarkupModule } from '../markup/markup.module';

@NgModule({
	declarations: [
		GridComponent,
	],
	exports: [
		GridComponent,
	],
	imports: [
		CommonModule,

		BoxModule,
		LayerModule,
		MarkupModule,
		ScrollModule,
		TemplateModule,
		ThemeModule,
		ToolbarModule,
		ViewModule,
	],
	providers: [
		DatePipe,
		DecimalPipe,
		CurrencyPipe,
		GridModelBuilder,
		Grid,
	]
})
export class GridModule {
	constructor(
		zone: NgZone,
		datePipe: DatePipe,
		numberPipe: DecimalPipe,
		currencyPipe: CurrencyPipe
	) {
		FormatService.date = (x, format) => datePipe.transform(x, format);
		FormatService.number = (x, format) => numberPipe.transform(x, format);
		FormatService.currency = (x, format) => currencyPipe.transform(x, format);

		Fastdom.invoke = task => zone.runOutsideAngular<any>(task);
	}
}
