import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-row-number-basic',
	templateUrl: 'example-column-row-number-basic.component.html',
	styleUrls: ['example-column-row-number-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnRowNumberBasicComponent {
	rows = [
		{},
		{},
		{},
		{}
	];

	constructor(dataService: DataService) {
	}
}