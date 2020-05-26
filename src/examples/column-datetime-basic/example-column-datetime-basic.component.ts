import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'example-column-datetime-basic',
	templateUrl: 'example-column-datetime-basic.component.html',
	styleUrls: ['example-column-datetime-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnDateTimeBasicComponent {
	static id = 'column-datetime-basic';

	rows = [
		{
			'number': 100.12,
			'bool': true,
			'date': new Date(2018, 9, 12, 12, 30, 40),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'text': '2018/3/28',
			'maxLength2': 'PI',
			'format': new Date(2018, 9, 12, 1, 25, 0),
			'customTemplate': new Date(2018, 13, 33)
		}
	];
}
