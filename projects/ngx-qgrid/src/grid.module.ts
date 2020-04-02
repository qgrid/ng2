import { NgModule, NgZone } from '@angular/core';
import { DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { FormatService } from 'ng2-qgrid/core/format/format.service';
import { MainModule } from './main/main.module';
import { TemplateModule } from './template/template.module';
import { TemplateCacheDirective } from './template/template-cache.directive';
import { GridComponent } from './main/grid/grid.component';
import { ColumnListComponent } from './main/column/column-list.component';
import { ColumnComponent } from './main/column/column.component';
import { PluginModule } from './plugins/plugin.module';
import { FocusModule } from './common/focus/focus.module';
import { RowComponent } from './main/core/row/row.component';
import { ThemeService } from './template/theme.service';
import { BackdropService } from './plugins/backdrop/backdrop.service';
import { ModelBuilderService } from './main/model/model-builder.service';

@NgModule({
	exports: [
		GridComponent,
		ColumnListComponent,
		ColumnComponent,
		TemplateCacheDirective,
		PluginModule,
		MainModule,
		TemplateModule,
		FocusModule,
		RowComponent
	],
	imports: [
		MainModule,
		TemplateModule
	],
	providers: [
		DatePipe,
		DecimalPipe,
		CurrencyPipe,
		ThemeService,
		BackdropService,
		ModelBuilderService
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
