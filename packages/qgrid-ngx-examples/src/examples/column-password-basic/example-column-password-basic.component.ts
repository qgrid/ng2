import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-password-basic',
	'Cell value has password format (all characters are replaced with the asterisk)'
];

@Component({
	selector: 'example-column-password-basic',
	templateUrl: 'example-column-password-basic.component.html',
	styleUrls: ['example-column-password-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnPasswordBasicComponent {
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
			'maxLength2': 'PI',
			'customTemplate': 'Hello World'
		}
	];
}
