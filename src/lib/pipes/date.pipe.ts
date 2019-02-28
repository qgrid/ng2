import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NgDatePipe } from '@angular/common';
import { Log } from 'ng2-qgrid/core/infrastructure/log';

@Pipe({
	name: 'qGridDate'
})
export class DatePipe implements PipeTransform {
	constructor(private pipe: NgDatePipe) { }

	transform(value: any, format?: any, timezone?: any, locale?: any) {
		try {
			return this.pipe.transform(value, format, timezone, locale);
		} catch (ex) {
			Log.warn('DatePipe', ex.message);
			return value;
		}
	}
}
