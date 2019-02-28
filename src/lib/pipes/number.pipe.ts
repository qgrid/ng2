import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
	name: 'qGridNumber'
})
export class NumberPipe implements PipeTransform {
	constructor(private pipe: DecimalPipe) { }

	transform(value: any, digitsInfo?: any, locale?: any) {
		return this.pipe.transform(value, digitsInfo, locale);
	}
}
