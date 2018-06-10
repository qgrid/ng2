import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-email-basic',
	templateUrl: 'example-column-email-basic.component.html',
	styleUrls: ['example-column-email-basic.component.scss'],
	providers: [DataService]
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

	constructor(dataService: DataService) {
	}
}