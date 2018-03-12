import { NgModule } from '@angular/core';
import { ColumnSortModule } from './column-sort/column-sort.module';
import { PagerModule } from './pagination/pager.module';
import { ProgressModule } from './progress/progress.module';
import { ColumnChooserModule } from './colum-chooser/column-chooser.module';
import { PopupModule } from './popup/popup.module';
import { DataManipulationModule } from './data-manipulation/data-manipulation.module';
import { ActionBarModule } from './action-bar/action-bar.module';
import { TitleModule } from './title/title.module';
import { ColumnFilterModule } from './column-filter/column-filter.module';
import { MenuModule } from './menu/menu.module';
import { CellEditorModule } from './cell-editor/cell-editor.module';
import { BoolEditorModule } from './bool-editor/bool-editor.module';
import { TabTrapModule } from './tab-trap/tab-trap.module';
import { BackdropModule } from './backdrop/backdrop.module';
import { SelectModule } from './select/select.module';
import { LegendModule } from './legend/legend.module';
import { ChipsModule } from './chips/chips.module';
import { ReferenceEditorModule } from './reference-editor/reference-editor.module';
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
import { BoolEditorModule } from './bool-editor';
import { TabTrapModule } from './tab-trap';
import { BackdropModule } from './backdrop';
import { SelectModule } from './select';
import { LegendModule } from './legend';
import { ChipsModule } from './chips';
import { ColumnChooserModel } from 'ng2-qgrid/plugin/column-chooser/column.chooser.model';
import { ColumnFilterModel } from 'ng2-qgrid/plugin/column-filter/column.filter.model';
import { DataManipulationModel } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.model';
import { ReferenceEditorModule } from 'ng2-qgrid/plugins/reference-editor';
import { EditFormModule } from 'ng2-qgrid/plugins/edit-form';
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
		BoolEditorModule,
		ReferenceEditorModule,
		TabTrapModule,
		BackdropModule,
		SelectModule,
		LegendModule,
		ChipsModule,
		EditFormModule
	]
})
export class PluginModule {}
