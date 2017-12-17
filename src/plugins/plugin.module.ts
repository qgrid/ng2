import { NgModule } from '@angular/core';
import { ColumnSortModule } from './column-sort';
import { PagerModule } from './pagination';
import { ProgressModule } from './progress';
import { ColumnChooserModule } from './colum-chooser';
import { PopupModule } from './popup';
import { DataManipulationModule } from './data-manipulation';
import { ActionBarModule } from './action-bar';
import { TitleModule } from './title';
import { ColumnFilterModule } from './column-filter';
import { MenuModule } from './menu';
import { CellEditorModule } from './cell-editor';
import { TabTrapModule } from './tab-trap';

import { ColumnChooserModel } from 'ng2-qgrid/plugin/column-chooser/column.chooser.model';
import { ColumnFilterModel } from 'ng2-qgrid/plugin/column-filter/column.filter.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

Model.register('columnChooser', ColumnChooserModel)
	.register('columnFilter', ColumnFilterModel);

@NgModule({
	declarations: [],
	exports: [
		ActionBarModule,
		DataManipulationModule,
		PagerModule,
		ColumnChooserModule,
		ColumnSortModule,
		ColumnFilterModule,
		PopupModule,
		ProgressModule,
		TitleModule,
		MenuModule,
		CellEditorModule,
		TabTrapModule
	],
	imports: [
	],
	providers: []
})
export class PluginModule {
}
