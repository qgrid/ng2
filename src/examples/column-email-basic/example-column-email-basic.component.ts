import { Component } from '@angular/core';

@Component({
	selector: 'example-column-email-basic',
	templateUrl: 'example-column-email-basic.component.html',
	styleUrls: ['example-column-email-basic.component.scss']
})
export class ExampleColumnEmailBasicComponent {
	rows = [
		{
			'valid': 'qgrid.team@gmail.com',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'qgrid.team@gmail.com',
			'null': null,
			'undefined': undefined,
			'empty': '',
			'customTemplate': 'qgrid.team@gmail.com'
		}
	];

	private label = 'QGRID';

	myLabel: (row: any, value?: any) => string | undefined;

	constructor() {
		const self = this;
		this.myLabel = function (row, value) {
			if (arguments.length > 1) {
				self.label = value;
				return;
			}

			return self.label;
		};
	}
}
