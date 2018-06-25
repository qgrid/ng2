import { Component } from '@angular/core';

@Component({
	selector: 'example-column-number-basic',
	templateUrl: 'example-column-number-basic.component.html',
	styleUrls: ['example-column-number-basic.component.scss']
})
export class ExampleColumnNumberBasicComponent {
	rows = [
		{
			'number': 100,
			'format3.1-5': Math.PI,
			'max': Number.MAX_VALUE,
			'min': Number.MIN_VALUE,
			'null': null,
			'undefined': undefined,
			'empty': '',
			'string': '120',
			'customTemplate': 30
		}
	];
}