import { NgModule, NgZone } from '@angular/core';
import { DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Defer } from 'ng2-qgrid/core/infrastructure/defer';
import { setup } from 'ng2-qgrid/core/setup';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
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

@NgModule({
	declarations: [],
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
		ThemeService
	]
})
export class GridModule {
	constructor(zone: NgZone, datePipe: DatePipe, numberPipe: DecimalPipe, currencyPipe: CurrencyPipe) {
		FormatService.date = (x, format) => datePipe.transform(x, format);
		FormatService.number = (x, format) => numberPipe.transform(x, format);
		FormatService.currency = (x, format) => currencyPipe.transform(x, format);
		

		jobLine.run = (job, delay) => {
			const defer = new Defer();

			let token;
			zone.runOutsideAngular(() => token = setTimeout(job, delay));
			defer.promise.catch(() => clearTimeout(token));

			return defer;
		};

		Fastdom.invoke = task => zone.runOutsideAngular(task);

		setup(Model);
	}
}
