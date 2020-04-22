import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Log } from '@qgrid/core/infrastructure/log';

@Pipe({
	name: 'qGridTime'
})
export class TimePipe implements PipeTransform {
	constructor(private pipe: DatePipe) { }

	transform(value: any, format?: any, timezone?: any, locale?: any) {
		try {
			return this.pipe.transform(value, format, timezone, locale);
		} catch (ex) {
			Log.warn('TimePipe', ex.message);
			return value;
		}
	}
}
