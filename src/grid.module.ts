import {NgModule} from '@angular/core';
import {MainModule} from './main';
import {ThemeService as Theme} from './theme/theme.service';
import {ThemeService, TemplateLinkService, TemplateModule} from './template';
import {TemplateCacheDirective} from './template/template-cache.directive';
import {Model} from 'ng2-qgrid/core/infrastructure';
import {setup} from 'ng2-qgrid/core/index';
import {GridService} from './main/grid/grid.service';
import {GridComponent} from './main/grid/grid.component';
import {ColumnListComponent, ColumnComponent} from './main/column';

@NgModule({
	declarations: [],
	exports: [
		GridComponent,
		ColumnListComponent,
		ColumnComponent,
		TemplateCacheDirective,
		MainModule,
		TemplateModule
	],
	imports: [
		MainModule,
		TemplateModule
	],
	providers: [
		GridService,
		TemplateLinkService,
		ThemeService
	]
})
export class GridModule {
	constructor(themeService: ThemeService, theme: Theme) {
		setup(Model);
		themeService.name = theme.name;
	}
}
