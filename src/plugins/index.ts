import {NgModule} from '@angular/core';
import {PagerModule} from './pagination';
import {ProgressModule} from './progress';

export * from './plugin.module';
export * from './plugin.component';

export * from './pagination/index';
export * from './progress/index';
// export * from './popup';
// export * from './sort-bar';

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
