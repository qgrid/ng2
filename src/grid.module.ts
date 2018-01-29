import { NgModule, NgZone } from '@angular/core';
import { MainModule } from './main';
import { ThemeService, TemplateModule } from './template';
import { TemplateCacheDirective } from './template/template-cache.directive';
import { Model } from 'ng2-qgrid/core/infrastructure';
import { setup } from 'ng2-qgrid/core/index';
import { GridComponent } from './main/grid/grid.component';
import { ColumnListComponent, ColumnComponent } from './main/column';
import { PluginModule } from './plugins';
import { FocusModule } from './common';
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

		jobLine.run = (job, delay) =>
			zone.runOutsideAngular(() => setTimeout(job, delay));

		jobLine.clear = cancellationToken =>
			zone.runOutsideAngular(() => clearTimeout(cancellationToken));
	}
}
