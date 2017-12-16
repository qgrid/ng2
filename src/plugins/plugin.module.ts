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
		MenuModule
	],
	imports: [
	],
	providers: []
})
export class PluginModule {
}
