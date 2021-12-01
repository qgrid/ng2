import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const EXAMPLE_TAGS = [
	'details-row-grid',
	'Details section of every row is a grid'
];

@Component({
	selector: 'example-details-row-grid',
	templateUrl: 'example-details-row-grid.component.html',
	styleUrls: ['example-details-row-grid.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailsRowGridComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;
	map = new Map<string, Observable<Atom[]>>();

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	getTheSamePhaseRows(atom: Atom) {
		let subject = this.map.get(atom.phase);
		if (!subject) {
			subject = this.rows.pipe(map(rows => rows.filter(row => row.phase === atom.phase).slice(0, 3)));
			this.map.set(atom.phase, subject);
		}

		return subject;
	}
}
