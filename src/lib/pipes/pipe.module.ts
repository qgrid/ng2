import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';
import { FilterPipe } from './filter.pipe';
import { TimePipe } from './time.pipe';
import { NumberPipe } from './number.pipe';
import { DatePipe } from './date.pipe';
import { CurrencyPipe } from './currency.pipe';
import { ArrayPipe } from './array.pipe';

@NgModule({
	declarations: [
		HighlightPipe,
		FilterPipe,
		TimePipe,
		NumberPipe,
		DatePipe,
		CurrencyPipe,
		ArrayPipe,
	],
	exports: [
		HighlightPipe,
		FilterPipe,
		TimePipe,
		NumberPipe,
		DatePipe,
		CurrencyPipe,
		ArrayPipe,
	]
})
export class PipeModule {
}
