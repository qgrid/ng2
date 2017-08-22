import {NgModule} from '@angular/core';
import {MainModule} from './main';
import {ThemeService as Theme} from './themes/material/theme.service';
import {ThemeService, TemplateLinkService, TemplateModule} from './template';
import {TemplateCacheDirective} from './template/template-cache.directive';
import {Model} from 'ng2-qgrid/core/infrastructure';
import {setup} from 'ng2-qgrid/core';
import {GridComponent} from './main/grid';
import {ColumnListComponent, ColumnComponent} from './main/column';

@NgModule({
	declarations: [],
	exports: [
		GridComponent,
		ColumnListComponent,
		ColumnComponent,
		TemplateCacheDirective
	],
	imports: [
		MainModule,
		TemplateModule
	],
	providers: [
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
