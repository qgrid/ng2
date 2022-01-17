import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-row-number-basic',
	'Each row has its number'
];

@Component({
	selector: 'example-column-row-number-basic',
	templateUrl: 'example-column-row-number-basic.component.html',
	styleUrls: ['example-column-row-number-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnRowNumberBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{},
		{},
		{},
		{}
	];
}
