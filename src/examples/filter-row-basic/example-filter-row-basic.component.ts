import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-filter-row-basic',
	templateUrl: 'example-filter-row-basic.component.html',
	styleUrls: ['example-filter-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleFilterRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}