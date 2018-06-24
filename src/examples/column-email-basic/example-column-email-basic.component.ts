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
}