import { DatePipe } from '@angular/common';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormatDateAdapter } from './format-date-adapter';

@Directive({
	selector: '[q-grid-date-adapter]',
	providers: [DatePipe, { provide: DateAdapter, useClass: FormatDateAdapter } ],
})
export class DateAdapterDirective implements OnChanges {
	@Input('q-grid-date-adapter') format: string;

	constructor(
		datePipe: DatePipe,
		private adapter: DateAdapter<Date>) {
		const formatAdapter = this.adapter as FormatDateAdapter;
		formatAdapter.datePipe = datePipe;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.format) {
			const formatAdapter = this.adapter as FormatDateAdapter;
			formatAdapter.useFormat = this.format;
		}
	}
}
