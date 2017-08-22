import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridComponent, GridService} from './grid';
import {ColumnComponent, ColumnListComponent} from './column';
import {BoxComponent} from './box';
import {CoreModule} from './core';
import {ThemeModule} from 'ng2-qgrid/theme/theme.module';

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
}
