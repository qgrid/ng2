import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-rowspan',
	templateUrl: 'example-group-row-rowspan.component.html',
	styleUrls: ['example-group-row-rowspan.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowRowspanComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}