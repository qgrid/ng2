import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-details-row-start',
	templateUrl: 'example-details-row-start.component.html',
	styleUrls: ['example-details-row-start.component.scss'],
	providers: [DataService]
})
export class ExampleDetailsRowStartComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
