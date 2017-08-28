import {NgModule} from '@angular/core';
import {PagerModule} from './pagination';
import {ProgressModule} from './progress';
// import {PopupModule} from 'ng2-qgrid/plugins/popup/popup.module';
// import {SortBarModule} from 'ng2-qgrid/plugins/sort-bar';
// import {ExportModule} from './export';

@NgModule({
	declarations: [],
	exports: [
		PagerModule,
		ProgressModule,
		// PopupModule,
		// SortBarModule
		// ExportModule
	],
	imports: [
		PagerModule,
		ProgressModule,
		// PopupModule,
		// SortBarModule
	],
	providers: []
})
export class PluginModule {
}
