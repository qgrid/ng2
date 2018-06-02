import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-flat',
	templateUrl: 'example-group-row-flat.component.html',
	styleUrls: ['example-group-row-flat.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowFlatComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}