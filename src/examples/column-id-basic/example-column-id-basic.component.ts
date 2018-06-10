import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-id-basic',
	templateUrl: 'example-column-id-basic.component.html',
	styleUrls: ['example-column-id-basic.component.scss'],
	providers: [DataService]
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

	constructor(dataService: DataService) {
	}
}