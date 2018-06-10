import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-url-basic',
	templateUrl: 'example-column-url-basic.component.html',
	styleUrls: ['example-column-url-basic.component.scss'],
	providers: [DataService]
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

	constructor(dataService: DataService) {
	}
}