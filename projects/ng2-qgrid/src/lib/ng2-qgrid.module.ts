import { NgModule } from '@angular/core';

import {
	GridModule as NgxGridModule,
	ColumnListModule,
	ColumnModule,
	DndModule,
	ResizeModule,
	RowModule,
	TemplateModule,
	ThemeModule,
	ToolbarModule,
	VscrollModule,
} from 'ngx-qgrid';

import {
	PluginsModule
} from 'ngx-qgrid-plugins';

@NgModule({
	exports: [
		NgxGridModule,
		ColumnListModule,
		ColumnModule,
		ToolbarModule,
		RowModule,
		VscrollModule,
		ThemeModule,
		ResizeModule,
		DndModule,
		TemplateModule,
		PluginsModule
	],
})
export class GridModule {

}
