import { DatePipe } from '@angular/common';
import { NativeDateAdapter } from '@angular/material/core';

export class FormatDateAdapter extends NativeDateAdapter {
	useFormat: string;
	datePipe: DatePipe;

	format(date: Date, displayFormat: any): string {
		if (this.useFormat) {
			return this.datePipe.transform(date, this.useFormat);
		}

		return super.format(date, displayFormat);
	}
}
