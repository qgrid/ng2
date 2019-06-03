import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'example-column-time-basic',
	templateUrl: 'example-column-time-basic.component.html',
	styleUrls: ['example-column-time-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnTimeBasicComponent {
	static id = 'column-time-basic';

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
