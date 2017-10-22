import { NgModule } from '@angular/core';
import { PagerModule } from './pagination';
import { ProgressModule } from './progress';
import { ColumnChooserModule } from './colum-chooser';
import { PopupModule } from './popup';
import { DataManipulationModule } from './data-manipulation';
import { ActionBarModule } from './action-bar';
import { TitleModule } from './title';
import { ColumnFilterModule } from './column-filter';

@NgModule({
	declarations: [],
	exports: [
		ActionBarModule,
		DataManipulationModule,
		PagerModule,
		ColumnChooserModule,
		PopupModule,
		ProgressModule,
		TitleModule,
		ColumnFilterModule
	],
	imports: [
	],
	providers: []
})
export class PluginModule {
}
