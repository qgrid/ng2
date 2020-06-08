import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-number-basic',
	'Cell value is number in different formats'
];

@Component({
	selector: 'example-column-number-basic',
	templateUrl: 'example-column-number-basic.component.html',
	styleUrls: ['example-column-number-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnNumberBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'number': 100,
			'format3.1-5': Math.PI,
			'max': Number.MAX_VALUE,
			'min': Number.MIN_VALUE,
			'null': null,
			'undefined': undefined,
			'empty': '',
			'string': '120',
			'customTemplate': 30
		}
	];
}
