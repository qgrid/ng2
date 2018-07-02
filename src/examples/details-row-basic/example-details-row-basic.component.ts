import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-details-row-basic',
	templateUrl: 'example-details-row-basic.component.html',
	styleUrls: ['example-details-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleDetailsRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
