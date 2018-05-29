import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pagination-basic',
	templateUrl: 'example-pagination-basic.component.html',
	styleUrls: ['example-pagination-basic.component.scss'],
	providers: [DataService]
})
export class ExamplePaginationBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}