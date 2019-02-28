import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NgDatePipe } from '@angular/common';

@Pipe({
	name: 'qGridDate'
})
export class DatePipe implements PipeTransform {
	constructor(private pipe: NgDatePipe) { }

	transform(value: any, format?: any, timezone?: any, locale?: any) {
		return this.pipe.transform(value, format, timezone, locale);
	}
}
