import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-aggregation',
	templateUrl: 'example-group-row-aggregation.component.html',
	styleUrls: ['example-group-row-aggregation.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowAggregationComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}