import { Component, ChangeDetectionStrategy } from '@angular/core';

const EXAMPLE_TAGS = [
	'column-bool-basic',
	'Cell value is boolean'
];

@Component({
	selector: 'example-column-bool-basic',
	templateUrl: 'example-column-bool-basic.component.html',
	styleUrls: ['example-column-bool-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnBoolBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows = [
		{
			'true': true,
			'false': false,
			'null': null,
			'undefined': undefined,
			'yesNo': 'yes',
			'noYes': 'no',
			'nullYesNo': null,
			'triggerFocus': true,
			'triggerClick': false,
			'customTemplate': true
		}
	];
}
