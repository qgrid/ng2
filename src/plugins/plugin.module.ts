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
import { BackdropModule } from './backdrop';
import { SelectModule } from './select';
import { LegendModule } from './legend';
import { ChipsModule } from './chips';

import { ColumnChooserModel } from 'ng2-qgrid/plugin/column-chooser/column.chooser.model';
import { ColumnFilterModel } from 'ng2-qgrid/plugin/column-filter/column.filter.model';
import { DataManipulationModel } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

Model.register('columnChooser', ColumnChooserModel)
	.register('columnFilter', ColumnFilterModel)
	.register('dataManipulation', DataManipulationModel);

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
		TabTrapModule,
		BackdropModule,
		SelectModule,
		LegendModule,
		ChipsModule
	],
	imports: [],
	providers: []
})
export class PluginModule {}
