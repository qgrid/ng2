import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-bool-basic',
	templateUrl: 'example-column-bool-basic.component.html',
	styleUrls: ['example-column-bool-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnBoolBasicComponent {
	rows = [
		{
			'true': true,
			'false': false,
			'null': null,
			'undefined': undefined,
			'yesNo': 'yes',
			'noYes': 'no',
			'nullYesNo': null,
			'triggerFocus': true
		}
	];

	constructor(dataService: DataService) {
	}
}