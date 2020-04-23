import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Log } from '@qgrid/core/infrastructure/log';

@Pipe({
	name: 'qGridNumber'
})
export class NumberPipe implements PipeTransform {
	constructor(private pipe: DecimalPipe) { }

	transform(value: any, digitsInfo?: any, locale?: any) {
		try {
			return this.pipe.transform(value, digitsInfo, locale);
		} catch (ex) {
			Log.warn('NumberPipe', ex.message);
			return value;
		}
	}
}
