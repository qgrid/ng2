import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight/highlight.pipe';
import { FilterPipe } from './filter/filter.pipe';
import { TimePipe } from './time/time.pipe';

@NgModule({
	declarations: [
		HighlightPipe,
		FilterPipe,
		TimePipe
	],
	exports: [
		HighlightPipe,
		FilterPipe,
		TimePipe
	]
})
export class PipeModule {
	constructor() {
	}
}
