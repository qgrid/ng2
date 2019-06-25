import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';
import { FilterPipe } from './filter.pipe';
import { TimePipe } from './time.pipe';
import { NumberPipe } from './number.pipe';
import { DatePipe } from './date.pipe';
import { TextPipe } from './text.pipe';
import { CurrencyPipe } from './currency.pipe';
import { ArrayPipe } from './array.pipe';
import { ItemLabelPipe } from './item-label.pipe';

@NgModule({
	declarations: [
		ArrayPipe,
		CurrencyPipe,
		DatePipe,
		FilterPipe,
		HighlightPipe,
		ItemLabelPipe,
		NumberPipe,
		TextPipe,
		TimePipe,
	],
	exports: [
		ArrayPipe,
		CurrencyPipe,
		DatePipe,
		FilterPipe,
		HighlightPipe,
		ItemLabelPipe,
		NumberPipe,
		TextPipe,
		TimePipe,
	]
})
export class PipeModule {
}
