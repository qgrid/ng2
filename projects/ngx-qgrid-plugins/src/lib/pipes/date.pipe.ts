import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NgDatePipe } from '@angular/common';
import { Log } from '@qgrid/core/infrastructure/log';

@Pipe({
	name: 'qGridDate'
})
export class DatePipe implements PipeTransform {
	constructor(private pipe: NgDatePipe) { }

	transform(value: any, format?: any, timezone?: any, locale?: any) {
		try {
			// The value expression: a Date object, a number (milliseconds since UTC epoch), or an ISO string
			return this.pipe.transform(value, format, timezone, locale);
		} catch (ex) {
			Log.warn('DatePipe', ex.message);
			return value;
		}
	}
}
