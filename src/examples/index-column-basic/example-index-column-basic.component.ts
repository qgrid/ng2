import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-index-column-basic',
	templateUrl: 'example-index-column-basic.component.html',
	styleUrls: ['example-index-column-basic.component.scss'],
	providers: [DataService]
})
export class ExampleIndexColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}