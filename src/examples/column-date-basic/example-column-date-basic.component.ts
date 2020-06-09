import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-date-basic',
	'Cell value is date'
];

@Component({
	selector: 'example-column-date-basic',
	templateUrl: 'example-column-date-basic.component.html',
	styleUrls: ['example-column-date-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnDateBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'number': 100.12,
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'text': '2018/3/28',
			'maxLength2': 'PI',
			'format': new Date(2018, 9, 12),
			'customTemplate': new Date(2018, 9, 12)
		}
	];
}
