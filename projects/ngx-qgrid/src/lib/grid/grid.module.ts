import { NgModule, NgZone } from '@angular/core';
import { DatePipe, DecimalPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { BoxModule } from '../box/box.module';
import { EventModule } from '../event/event.module';
import { Fastdom } from '@qgrid/core/services/fastdom';
import { FormatService } from '@qgrid/core/format/format.service';
import { Grid } from './grid';
import { GridComponent } from './grid.component';
import { GridModelBuilder } from './grid-model.builder';
import { LayerModule } from '../layer/layer.module';
import { MarkupModule } from '../markup/markup.module';
import { ScrollModule } from '../scroll/scroll.module';
import { TemplateModule } from '../template/template.module';
import { ThemeModule } from '../theme/theme.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ViewModule } from '../view/view.module';

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
		EventModule,
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
