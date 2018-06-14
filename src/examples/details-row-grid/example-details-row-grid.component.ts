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
	map = new Map<string, Observable<Atom[]>>();

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	getSamePhaseRows(atom: Atom) {
		let subject = this.map.get(atom.phase);
		if (!subject) {
			subject = this.rows.pipe(map(rows => rows.filter(row => row.phase === atom.phase).slice(0, 3)));
			this.map.set(atom.phase, subject);
		}

		return subject;
	}
}
