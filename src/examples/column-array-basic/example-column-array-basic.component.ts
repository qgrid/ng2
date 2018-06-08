import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-array-basic',
	templateUrl: 'example-column-array-basic.component.html',
	styleUrls: ['example-column-array-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnArrayBasicComponent {
	rows = [
		{
			'strings': ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
			'numbers': [1, 3, 5, 7, 11, 13, 17, 19, 23],
			'booleans': [true, false, true],
			'nulls': [null, undefined, ''],
			'dates': [new Date(2018, 1, 12), new Date(2018, 2, 13)],
			'customTemplate': ['Lorem', 'ipsum', 'dolor', 'sit', 'amet']
		}
	];

	constructor(dataService: DataService) {
	}
}