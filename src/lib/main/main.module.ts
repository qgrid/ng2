import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { Grid } from './grid/grid.service';
import { ColumnComponent } from './column/column.component';
import { ColumnListComponent } from './column/column-list.component';
import { BoxComponent } from './box/box.component';
import { CoreModule } from './core/core.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RowComponent } from './core/row/row.component';
import { MarkupDirective } from './markup/markup.directive';
import { CommonModule as GridCommonModule } from '../common/common.module';
import { VisibilityComponent } from './visibility/visibility.component';

@NgModule({
	declarations: [
		BoxComponent,
		ColumnComponent,
		ColumnListComponent,
		GridComponent,
		MarkupDirective,
		RowComponent,
		ToolbarComponent,
		VisibilityComponent,
	],
	exports: [
		BoxComponent,
		ColumnComponent,
		ColumnListComponent,
		GridCommonModule,
		GridComponent,
		RowComponent,
		ToolbarComponent,
		VisibilityComponent,
	],
	imports: [
		CoreModule,
		CommonModule,
		GridCommonModule
	],
	providers: [
		Grid
	]
})
export class MainModule {
}
