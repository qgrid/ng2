import { NgModule } from '@angular/core';
import { PagerModule } from './pagination';
import { ProgressModule } from './progress';
import { PopupModule } from './popup';

@NgModule({
	declarations: [],
	exports: [
		PagerModule,
		ProgressModule,
		PopupModule
	],
	imports: [
	],
	providers: []
})
export class PluginModule {
}
