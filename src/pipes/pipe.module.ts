import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight/highlight.pipe';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
	declarations: [
		HighlightPipe,
		FilterPipe
	],
	exports: [
		HighlightPipe,
		FilterPipe
	],
	imports: [
	],
	providers: [
	]
})
export class PipeModule {
	constructor() {
	}
}
