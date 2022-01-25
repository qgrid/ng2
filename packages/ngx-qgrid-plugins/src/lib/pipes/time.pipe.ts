import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '@qgrid/core';

@Pipe({
	name: 'qGridTime'
})
export class TimePipe implements PipeTransform {
	constructor(private pipe: DatePipe) { }

	transform(value: any, format?: any, timezone?: any, locale?: any) {
		try {
			return this.pipe.transform(value, format, timezone, locale);
		} catch (ex: any) {
			Log.warn('TimePipe', ex.message);
			return value;
		}
	}
}
