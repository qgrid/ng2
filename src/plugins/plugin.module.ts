import {NgModule} from '@angular/core';
import {PagerModule} from './pagination';
import {ProgressModule} from './progress';
import {ExportModule} from './export';

@NgModule({
	declarations: [],
	exports: [
		PagerModule,
		ProgressModule,
		ExportModule
	],
	imports: [],
	providers: []
})
export class PluginModule {
}
