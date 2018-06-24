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
}