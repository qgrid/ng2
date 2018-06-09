import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-currency-basic',
	templateUrl: 'example-column-currency-basic.component.html',
	styleUrls: ['example-column-currency-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnCurrencyBasicComponent {
	rows = [
		{
			'number': 100,
			'euro': 200,
			'null': null,
			'undefined': undefined,
			'empty': '',
			'string': '120',
			'customTemplate': 30
		}
	];

	constructor(dataService: DataService) {
	}
}