import { NgModule } from '@angular/core';
import { PagerModule } from './pagination';
import { ProgressModule } from './progress';
import { PopupModule } from './popup';
import { DataManipulationModule } from './data-manipulation';

@NgModule({
	declarations: [],
	exports: [
		PagerModule,
		ProgressModule,
		PopupModule,
		DataManipulationModule
	],
	imports: [
	],
	providers: []
})
export class PluginModule {
}
