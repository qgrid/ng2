import { Component } from '@angular/core';

@Component({
	selector: 'example-column-time-basic',
	templateUrl: 'example-column-time-basic.component.html',
	styleUrls: ['example-column-time-basic.component.scss']
})
export class ExampleColumnTimeBasicComponent {
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