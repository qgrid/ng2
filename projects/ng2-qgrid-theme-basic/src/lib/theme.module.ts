import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';
import {
	TemplateModule,
	GridModule,
	ThemeService,
	LayerModule,
	DndModule,
	ResizeModule,
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
	FileModule,
	FocusModule,
	ImportModule,
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
} from 'ng2-qgrid';

@NgModule({
	declarations: [
		ThemeComponent
	],
	exports: [
		ThemeComponent
	],
	imports: [
		CommonModule,
		FormsModule,

		TemplateModule,
		GridModule,
		DndModule,
		ResizeModule,

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
		FileModule,
		FocusModule,
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
	],
	entryComponents: [
		ThemeComponent
	]
})
export class ThemeModule {
	constructor(theme: ThemeService) {
		theme.name = 'basic';
		theme.component = ThemeComponent;
	}
}
