import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-summary-column-basic',
	templateUrl: 'example-summary-column-basic.component.html',
	styleUrls: ['example-summary-column-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSummaryColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}