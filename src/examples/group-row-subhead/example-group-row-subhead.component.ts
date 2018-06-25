import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-subhead',
	templateUrl: 'example-group-row-subhead.component.html',
	styleUrls: ['example-group-row-subhead.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowSubheadComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}