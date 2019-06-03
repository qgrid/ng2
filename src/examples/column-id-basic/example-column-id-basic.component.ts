import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'example-column-id-basic',
	templateUrl: 'example-column-id-basic.component.html',
	styleUrls: ['example-column-id-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnIdBasicComponent {
	static id = 'column-id-basic';

	rows = [
		{
			'number': 100.12,
			'bool': true,
			'date': new Date(2018, 9, 12),
			'text': 'some id',
			'null': null,
			'undefined': undefined,
			'empty': '',
			'customTemplate': 'my id'
		}
	];
}
