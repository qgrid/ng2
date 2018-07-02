import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pin-column-basic',
	templateUrl: 'example-pin-column-basic.component.html',
	styleUrls: ['example-pin-column-basic.component.scss'],
	providers: [DataService]
})
export class ExamplePinColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}