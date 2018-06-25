import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-details-row-all',
	templateUrl: 'example-details-row-all.component.html',
	styleUrls: ['example-details-row-all.component.scss'],
	providers: [DataService]
})
export class ExampleDetailsRowAllComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
