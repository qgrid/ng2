import { Component } from '@angular/core';

@Component({
	selector: 'example-column-url-basic',
	templateUrl: 'example-column-url-basic.component.html',
	styleUrls: ['example-column-url-basic.component.scss']
})
export class ExampleColumnUrlBasicComponent {
	rows = [
		{
			'valid': 'http://github.com/qgrid/ng2',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'http://github.com/qgrid/ng2',
			'null': null,
			'undefined': undefined,
			'empty': '',
			'customTemplate': 'http://github.com/qgrid/ng2'
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
