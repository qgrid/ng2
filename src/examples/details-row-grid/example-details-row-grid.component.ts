import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'example-details-row-basic',
	templateUrl: 'example-details-row-grid.component.html',
	styleUrls: ['example-details-row-grid.component.scss'],
	providers: [DataService]
})
export class ExampleDetailsRowGridComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	getSamePhaseRows(atom: Atom) {
		return this.rows.pipe(map(rows => rows.filter(row => row.phase === atom.phase)));
	}
}
