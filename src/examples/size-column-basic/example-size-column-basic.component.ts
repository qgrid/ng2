import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-size-column-basic',
	templateUrl: 'example-size-column-basic.component.html',
	styleUrls: ['example-size-column-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSizeColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}