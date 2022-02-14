import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-row-indicator-basic',
	'Table contains row indicators'
];

@Component({
	selector: 'example-column-row-indicator-basic',
	templateUrl: 'example-column-row-indicator-basic.component.html',
	styleUrls: ['example-column-row-indicator-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnRowIndicatorBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{},
		{},
		{},
		{}
	];
}
