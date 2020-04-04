import { NgModule } from '@angular/core';

import {
	GridModule as NgxGridModule,
	ColumnListModule,
	ColumnModule,
	ToolbarModule,
	RowModule,
	VscrollModule,
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
		PluginsModule
	],
})
export class GridModule {

}
