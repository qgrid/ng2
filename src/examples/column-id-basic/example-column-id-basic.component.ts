import { Component } from '@angular/core';

@Component({
	selector: 'example-column-id-basic',
	templateUrl: 'example-column-id-basic.component.html',
	styleUrls: ['example-column-id-basic.component.scss']
})
export class ExampleColumnIdBasicComponent {
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