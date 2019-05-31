import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'example-column-password-basic',
	templateUrl: 'example-column-password-basic.component.html',
	styleUrls: ['example-column-password-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnPasswordBasicComponent {

	static id = 'column-password-basic';

	rows = [
		{
			'number': 100.12,
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'maxLength2': 'PI',
			'customTemplate': 'Hello World',
		},
	];

}
