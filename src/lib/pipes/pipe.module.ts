import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';
import { FilterPipe } from './filter.pipe';
import { TimePipe } from './time.pipe';
import { NumberPipe } from './number.pipe';
import { DatePipe } from './date.pipe';
import { CurrencyPipe } from './currency.pipe';

@NgModule({
	declarations: [
		HighlightPipe,
		FilterPipe,
		TimePipe,
		NumberPipe,
		DatePipe,
		CurrencyPipe,
	],
	exports: [
		HighlightPipe,
		FilterPipe,
		TimePipe,
		NumberPipe,
		DatePipe,
		CurrencyPipe,
	]
})
export class PipeModule {
}
