import { NgModule } from '@angular/core';
import { ActionBarModule } from './action-bar/action-bar.module';
import { BackdropModule } from './backdrop/backdrop.module';
import { BoolEditorModule } from './bool-editor/bool-editor.module';
import { CaptionModule } from './caption/caption.module';
import { CellEditorModule } from './cell-editor/cell-editor.module';
import { ColumnChooserModel } from 'ng2-qgrid/plugin/column-chooser/column.chooser.model';
import { ColumnChooserModule } from './colum-chooser/column-chooser.module';
import { ColumnFilterModel } from 'ng2-qgrid/plugin/column-filter/column.filter.model';
import { ColumnFilterModule } from './column-filter/column-filter.module';
import { ColumnSortModule } from './column-sort/column-sort.module';
import { DataManipulationModel } from 'ng2-qgrid/plugin/data-manipulation/data.manipulation.model';
import { DataManipulationModule } from './data-manipulation/data-manipulation.module';
import { EbModule } from './expression-builder/eb.module';
import { LegendModule } from './legend/legend.module';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { PagerModule } from './pagination/pager.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ProgressModule } from './progress/progress.module';
import { QueryBuilderModel } from './query-builder/query-builder.model';
import { QueryBuilderModule } from './query-builder/query-builder.module';
import { ReferenceEditorModule } from './reference-editor/reference-editor.module';
import { RestModule } from './rest/rest.module';
import { StatusBarModule } from './status-bar/status-bar.module';
import { TabTrapModule } from './tab-trap/tab-trap.module';
import { TitleModule } from './title/title.module';

Model.register('columnChooser', ColumnChooserModel)
	.register('columnFilter', ColumnFilterModel)
	.register('dataManipulation', DataManipulationModel)
	.register('queryBuilder', QueryBuilderModel);

@NgModule({
	declarations: [],
	exports: [
		ActionBarModule,
		BackdropModule,
		BoolEditorModule,
		CaptionModule,
		CellEditorModule,
		ColumnChooserModule,
		ColumnFilterModule,
		ColumnSortModule,
		DataManipulationModule,
		EbModule,
		LegendModule,
		PagerModule,
		PersistenceModule,
		ProgressModule,
		QueryBuilderModule,
		ReferenceEditorModule,
		RestModule,
		StatusBarModule,
		TabTrapModule,
		TitleModule
	]
})
export class PluginModule { }
