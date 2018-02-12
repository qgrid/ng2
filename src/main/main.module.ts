import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { GridService } from './grid/grid.service';
import { ColumnComponent, ColumnListComponent } from './column';
import { BoxComponent } from './box';
import { CoreModule } from './core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RowComponent } from './core/row/row.component';
import { LayerComponent } from './core/layer/layer.component';
import { MarkupDirective } from './markup/markup.directive';

@NgModule({
	declarations: [
		GridComponent,
		BoxComponent,
		ColumnListComponent,
		ColumnComponent,
		ToolbarComponent,
		RowComponent,
		LayerComponent,
		MarkupDirective
	],
	exports: [
		GridComponent,
		ColumnListComponent,
		ColumnComponent,
		BoxComponent,
		ToolbarComponent,
		RowComponent,
		LayerComponent
	],
	imports: [
		CoreModule,
		CommonModule
	],
	providers: [
		GridService
	]
})
export class MainModule {
	constructor() {
	}
}
