import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-look-atoms-basic',
	templateUrl: 'example-look-atoms-basic.component.html',
	styleUrls: ['example-look-atoms-basic.component.scss'],
	providers: [DataService]
})
export class ExampleLookAtomsBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}