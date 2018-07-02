import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'qGridTime'
})
export class TimePipe extends DatePipe implements PipeTransform {
	transform(value: any, format?: any): any {
		const date = new Date(value);

		if (date instanceof Date && !isNaN(date as any)) {
			return super.transform(value, format);
		} else {
			return value;
		}

	}
}
