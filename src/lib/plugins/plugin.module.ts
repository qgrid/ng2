import { NgModule } from '@angular/core';
import { ActionBarModule } from './action-bar/action-bar.module';
import { AutoCompleteEditorModule } from './autocomplete-editor/autocomplete-editor.module';
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
import { EditFormModule } from './edit-form/edit-form.module';
import { ExportModule } from './export/export.module';
import { ImportModule } from './import/import.module';
import { LegendModule } from './legend/legend.module';
import { ModelBuilderService } from '../main/model/model-builder.service';
import { PagerModule } from './pagination/pager.module';
import { PaneModule } from './pane/pane.module';
import { PersistenceModule } from './persistence/persistence.module';
import { ProgressModule } from './progress/progress.module';
import { QueryBuilderModel } from './query-builder/query-builder.model';
import { QueryBuilderModule } from './query-builder/query-builder.module';
import { ReferenceEditorModule } from './reference-editor/reference-editor.module';
import { RestModule } from './rest/rest.module';
import { StatusBarModule } from './status-bar/status-bar.module';
import { TabTrapModule } from './tab-trap/tab-trap.module';
import { TitleModule } from './title/title.module';
import { ValidationModule } from './validation/validation.module';
import { LayerModule } from './layer/layer.module';
import { LiveCellModule } from './live-cell/live-cell.module';
import { LiveRowModule } from './live-row/live-row.module';
import { LiveColumnModule } from './live-column/live-column.module';

@NgModule({
	exports: [
		ActionBarModule,
		AutoCompleteEditorModule,
		BackdropModule,
		BoolEditorModule,
		CaptionModule,
		CellEditorModule,
		ColumnChooserModule,
		ColumnFilterModule,
		ColumnSortModule,
		DataManipulationModule,
		EbModule,
		EditFormModule,
		ExportModule,
		ImportModule,
		LayerModule,
		LegendModule,
		PagerModule,
		PaneModule,
		PersistenceModule,
		ProgressModule,
		QueryBuilderModule,
		ReferenceEditorModule,
		RestModule,
		StatusBarModule,
		TabTrapModule,
		TitleModule,
		ValidationModule,
		LiveCellModule,
		LiveRowModule,
		LiveColumnModule
	]
})
export class PluginModule {
	constructor(modelBuilder: ModelBuilderService) {
		modelBuilder
			.register('columnChooser', ColumnChooserModel)
			.register('columnFilter', ColumnFilterModel)
			.register('dataManipulation', DataManipulationModel)
			.register('queryBuilder', QueryBuilderModel);
	}
}
