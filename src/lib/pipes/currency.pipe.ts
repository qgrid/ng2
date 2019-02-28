import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe as NgCurrencyPipe } from '@angular/common';

@Pipe({
	name: 'qGridCurrency'
})
export class CurrencyPipe implements PipeTransform {
	constructor(private pipe: NgCurrencyPipe) { }

	transform(value: any, currencyCode?: string, display?: boolean, digitsInfo?: any, locale?: any) {
		return this.pipe.transform(value, currencyCode, display, digitsInfo, locale);
	}
}
