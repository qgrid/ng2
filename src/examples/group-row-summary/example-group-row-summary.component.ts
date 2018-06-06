import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-summary',
	templateUrl: 'example-group-row-summary.component.html',
	styleUrls: ['example-group-row-summary.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowSummaryComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}