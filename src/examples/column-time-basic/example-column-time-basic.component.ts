import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-time-basic',
	templateUrl: 'example-column-time-basic.component.html',
	styleUrls: ['example-column-time-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnTimeBasicComponent {
	rows = [
		{
			'number': 12000000,
			'bool': true,
			'date': new Date(2018, 9, 12, 12, 12, 12, 12),
			'null': null,
			'undefined': undefined,
			'empty': '',
			'text': '12:30',
			'maxLength2': 'PI',
			'format': new Date(2018, 9, 12, 12, 12, 12, 12),
			'customTemplate': new Date(2018, 9, 12, 12, 12, 12, 12)
		}
	];

	constructor(dataService: DataService) {
	}
}