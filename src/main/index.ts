import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridComponent} from './grid/grid.component';
import {GridService} from './grid/grid.service';
import {ColumnComponent, ColumnListComponent} from './column';
import {BoxComponent} from './box';
import {CoreModule} from './core';
import {ThemeModule} from 'ng2-qgrid/theme/theme.module';

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
		ColumnComponent
	],
	exports: [
		GridComponent,
		ColumnListComponent,
		ColumnComponent,
		BoxComponent
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
		console.log('Main module bootstrapped');
	}
}
