import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-currency-basic',
	'Cell value contains currency sign'
];

@Component({
	selector: 'example-column-currency-basic',
	templateUrl: 'example-column-currency-basic.component.html',
	styleUrls: ['example-column-currency-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnCurrencyBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

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
