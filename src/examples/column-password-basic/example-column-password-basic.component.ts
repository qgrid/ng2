import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-password-basic',
	templateUrl: 'example-column-password-basic.component.html',
	styleUrls: ['example-column-password-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnPasswordBasicComponent {
	rows = [
		{
			'number': 100.12,
			'bool': true,
			'date': new Date(2018, 9, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'maxLength2': 'PI',
			'customTemplate': 'Hello World'
		}
	];

	constructor(dataService: DataService) {
	}
}