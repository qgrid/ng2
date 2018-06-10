import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-row-indicator-basic',
	templateUrl: 'example-column-row-indicator-basic.component.html',
	styleUrls: ['example-column-row-indicator-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnRowIndicatorBasicComponent {
	rows = [
		{},
		{},
		{},
		{}
	];

	constructor(dataService: DataService) {
	}
}