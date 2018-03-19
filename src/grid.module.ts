import { NgModule, NgZone } from '@angular/core';
import { MainModule } from './main/main.module';
import { ThemeService } from './template/theme.service';
import { TemplateModule } from './template/template.module';
import { TemplateCacheDirective } from './template/template-cache.directive';
import { Model, Defer } from 'ng2-qgrid/core/infrastructure';
import { setup } from 'ng2-qgrid/core/index';
import { GridComponent } from './main/grid/grid.component';
import { ColumnListComponent } from './main/column/column-list.component';
import { ColumnComponent } from './main/column/column.component';
import { PluginModule } from './plugins/plugin.module';
import { FocusModule } from './common/focus/focus.module';
import { RowComponent } from './main/core/row/row.component';
import { jobLine } from 'ng2-qgrid/core/services/job.line';

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
	imports: [MainModule, TemplateModule]
})
export class GridModule {
	constructor(zone: NgZone) {
		setup(Model);

		jobLine.run = (job, delay) => {
			const defer = new Defer();

			let token;
			zone.runOutsideAngular(() => token = setTimeout(job, delay));
			defer.promise.catch(() => clearTimeout(token));

			return defer;
		};
	}
}
