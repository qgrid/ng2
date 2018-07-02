import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pivot-column-basic',
	templateUrl: 'example-pivot-column-basic.component.html',
	styleUrls: ['example-pivot-column-basic.component.scss'],
	providers: [DataService]
})
export class ExamplePivotColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}