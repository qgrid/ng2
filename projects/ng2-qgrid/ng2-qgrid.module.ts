import { NgModule } from '@angular/core';

import {
	GridModule as NgxGridModule,
	ColumnListModule,
	ColumnModule,
	ToolbarModule,
	RowModule,
	VscrollModule,
	ThemeModule,
	ResizeModule,
	DndModule,
} from 'ngx-qgrid';

import {
	PluginsModule
} from 'ngx-qgrid/plugins';

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
		PluginsModule
	],
})
export class GridModule {

}
