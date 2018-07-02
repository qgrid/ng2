import { Component } from '@angular/core';

@Component({
	selector: 'example-column-bool-basic',
	templateUrl: 'example-column-bool-basic.component.html',
	styleUrls: ['example-column-bool-basic.component.scss']
})
export class ExampleColumnBoolBasicComponent {
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
			'customTemplate': true
		}
	];
}