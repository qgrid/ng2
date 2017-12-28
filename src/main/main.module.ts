import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridComponent } from './grid/grid.component';
import { GridService } from './grid/grid.service';
import { ColumnComponent, ColumnListComponent } from './column';
import { BoxComponent } from './box';
import { CoreModule } from './core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RowComponent } from './core/row/row.component';
import { MarkupDirective } from './markup/markup.directive';

@NgModule({
	declarations: [
		GridComponent,
		BoxComponent,
		ColumnListComponent,
		ColumnComponent,
		ToolbarComponent,
		RowComponent,
		MarkupDirective
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
		CoreModule	
	],
	providers: [
		GridService
	]
})
export class MainModule {
	constructor() {
	}
}
