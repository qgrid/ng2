import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-focus-cell-auto',
	templateUrl: 'example-focus-cell-auto.component.html',
	styleUrls: ['example-focus-cell-auto.component.scss'],
	providers: [DataService]
})
export class ExampleFocusCellAutoComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}