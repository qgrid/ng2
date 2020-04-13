import { NgModule } from '@angular/core';
import { ActionBarModule } from './action-bar/action-bar.module';
import { ActionModule } from './action/action.module';
import { AutoCompleteEditorModule } from './autocomplete-editor/autocomplete-editor.module';
import { BackdropModule } from './backdrop/backdrop.module';
import { BoolEditorModule } from './bool-editor/bool-editor.module';
import { CaptionModule } from './caption/caption.module';
import { CellEditorModule } from './cell-editor/cell-editor.module';
import { ColumnChooserModel } from 'qgrid-plugins/column-chooser/column.chooser.model';
import { ColumnChooserModule } from './colum-chooser/column-chooser.module';
import { ColumnFilterModel } from 'qgrid-plugins/column-filter/column.filter.model';
import { ColumnFilterModule } from './column-filter/column-filter.module';
import { ColumnSortModule } from './column-sort/column-sort.module';
import { CommandModule } from './command/command.module';
import { DataManipulationModel } from 'qgrid-plugins/data-manipulation/data.manipulation.model';
import { DataManipulationModule } from './data-manipulation/data-manipulation.module';
import { EbModule } from './expression-builder/eb.module';
import { EditFormModule } from './edit-form/edit-form.module';
import { ExportModule } from './export/export.module';
import { FileModule } from './file/file.module';
import { FocusModule } from './focus/focus.module';
import { GridModelBuilder } from 'ngx-qgrid';
import { ImportModule } from './import/import.module';
import { LayerModule } from './layer/layer.module';
import { LayoutModule } from './layout/layout.module';
import { LegendModule } from './legend/legend.module';
import { LiveCellModule } from './live-cell/live-cell.module';
import { LiveColumnModule } from './live-column/live-column.module';
import { LiveRowModule } from './live-row/live-row.module';
import { PagerModule } from './pagination/pager.module';
import { PaneModule } from './pane/pane.module';
import { PersistenceModule } from './persistence/persistence.module';
import { PipeModule } from './pipes/pipe.module';
import { ProgressModule } from './progress/progress.module';
import { QueryBuilderModel } from './query-builder/query-builder.model';
import { QueryBuilderModule } from './query-builder/query-builder.module';
import { ReferenceEditorModule } from './reference-editor/reference-editor.module';
import { RestModule } from './rest/rest.module';
import { StatusBarModule } from './status-bar/status-bar.module';
import { TabTrapModule } from './tab-trap/tab-trap.module';
import { TitleModule } from './title/title.module';
import { ValidationModule } from './validation/validation.module';
import { VisibilityModule } from './visibility/visibility.module';

@NgModule({
	exports: [
		ActionBarModule,
		ActionModule,
		AutoCompleteEditorModule,
		BackdropModule,
		BoolEditorModule,
		CaptionModule,
		CellEditorModule,
		ColumnChooserModule,
		ColumnFilterModule,
		ColumnSortModule,
		CommandModule,
		DataManipulationModule,
		EbModule,
		EditFormModule,
		ExportModule,
		FocusModule,
		FileModule,
		ImportModule,
		LayerModule,
		LayoutModule,
		LegendModule,
		LiveCellModule,
		LiveColumnModule,
		LiveRowModule,
		PagerModule,
		PaneModule,
		PersistenceModule,
		PipeModule,
		ProgressModule,
		QueryBuilderModule,
		ReferenceEditorModule,
		RestModule,
		StatusBarModule,
		TabTrapModule,
		TitleModule,
		ValidationModule,
		VisibilityModule,
	]
})
export class PluginsModule {
	constructor(modelBuilder: GridModelBuilder) {
		modelBuilder
			.register('columnChooser', ColumnChooserModel)
			.register('columnFilter', ColumnFilterModel)
			.register('dataManipulation', DataManipulationModel)
			.register('queryBuilder', QueryBuilderModel);
	}
}
