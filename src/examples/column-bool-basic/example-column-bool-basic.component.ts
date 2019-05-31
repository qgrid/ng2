import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'example-column-bool-basic',
	templateUrl: 'example-column-bool-basic.component.html',
	styleUrls: ['example-column-bool-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnBoolBasicComponent {

	static id = 'column-bool-basic';

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
			'customTemplate': true,
		},
	];

}
