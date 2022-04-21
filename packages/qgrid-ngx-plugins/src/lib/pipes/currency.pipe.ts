import { CurrencyPipe as NgCurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '@qgrid/core';

@Pipe({
	name: 'qGridCurrency',
})
export class CurrencyPipe implements PipeTransform {
	constructor(private pipe: NgCurrencyPipe) { }

	transform(value: any, currencyCode?: string, display?: boolean, digitsInfo?: any, locale?: any) {
		try {
			return this.pipe.transform(value, currencyCode, display, digitsInfo, locale);
		} catch (ex) {
			Log.warn('DatePipe', ex.message);
			return value;
		}
	}
}
