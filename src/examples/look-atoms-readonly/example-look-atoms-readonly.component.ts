import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-look-atoms-readonly',
	templateUrl: 'example-look-atoms-readonly.component.html',
	styleUrls: ['example-look-atoms-readonly.component.scss'],
	providers: [DataService]
})
export class ExampleLookAtomsReadonlyComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}