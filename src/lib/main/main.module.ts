import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { GridService } from './grid/grid.service';
import { ColumnComponent } from './column/column.component';
import { ColumnListComponent } from './column/column-list.component';
import { BoxComponent } from './box/box.component';
import { CoreModule } from './core/core.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RowComponent } from './core/row/row.component';
import { LayerComponent } from './core/layer/layer.component';
import { MarkupDirective } from './markup/markup.directive';
import { CommonModule as GridCommonModule } from '../common/common.module';
import { VisibilityComponent } from './visibility/visibility.component';

@NgModule({
	declarations: [
		BoxComponent,
		ColumnComponent,
		ColumnListComponent,
		GridComponent,
		LayerComponent,
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
		LayerComponent,
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
		GridService
	]
})
export class MainModule {
}
