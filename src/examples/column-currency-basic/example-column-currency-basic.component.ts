import { Component } from '@angular/core';

@Component({
	selector: 'example-column-currency-basic',
	templateUrl: 'example-column-currency-basic.component.html',
	styleUrls: ['example-column-currency-basic.component.scss']
})
export class ExampleColumnCurrencyBasicComponent {
	rows = [
		{
			'number': 100,
			'euro': 200,
			'null': null,
			'undefined': undefined,
			'empty': '',
			'string': '120',
			'customTemplate': 30
		}
	];
}