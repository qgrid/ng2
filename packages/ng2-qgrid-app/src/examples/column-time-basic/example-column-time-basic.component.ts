import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-time-basic',
	'Cell value is in time format and can be entered using corresponding time input'
];

@Component({
	selector: 'example-column-time-basic',
	templateUrl: 'example-column-time-basic.component.html',
	styleUrls: ['example-column-time-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnTimeBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'number': 12000000,
			'bool': true,
			'date': new Date(2018, 9, 12, 12, 12, 12, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'text': '12:30',
			'maxLength2': 'PI',
			'format': new Date(2018, 9, 12, 12, 12, 12, 12),
			'customTemplate': new Date(2018, 9, 12, 12, 12, 12, 12)
		}
	];
}
