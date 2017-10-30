import { NgModule } from '@angular/core';
import { MainModule } from './main';
import { ThemeService as Theme } from './themes/material/theme.service';
import { ThemeService, TemplateModule } from './template';
import { TemplateLinkService } from './template/template-link.service';
import { TemplateCacheDirective } from './template/template-cache.directive';
import { Model } from 'ng2-qgrid/core/infrastructure';
import { setup } from 'ng2-qgrid/core/index';
import { GridService } from './main/grid/grid.service';
import { GridComponent } from './main/grid/grid.component';
import { ColumnListComponent, ColumnComponent } from './main/column';
import { PluginModule } from './plugins';
import { FocusModule } from './common';
import { RowComponent } from './main/core/row/row.component';

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
