import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-id-basic',
	'Columns with id-type work with different data'
];

@Component({
	selector: 'example-column-id-basic',
	templateUrl: 'example-column-id-basic.component.html',
	styleUrls: ['example-column-id-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnIdBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

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
