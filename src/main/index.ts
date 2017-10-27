import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridComponent} from './grid/grid.component';
import {GridService} from './grid/grid.service';
import {ColumnComponent, ColumnListComponent} from './column';
import {BoxComponent} from './box';
import {CoreModule} from './core';
import {ThemeModule} from 'ng2-qgrid/themes/material/theme.module';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {RowComponent} from 'ng2-qgrid/main';

export * from './box/index';
export * from './column/index';
export * from './core/index';
export * from './grid/index';
export * from './layer/index';

@NgModule({
	declarations: [
		GridComponent,
		BoxComponent,
		ColumnListComponent,
		ColumnComponent,
		ToolbarComponent,
		RowComponent
	],
	exports: [
		GridComponent,
		ColumnListComponent,
		ColumnComponent,
		BoxComponent,
		ToolbarComponent,
		RowComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		ThemeModule
	],
	providers: [
		GridService
	]
})
export class MainModule {
	constructor() {
	}
}
