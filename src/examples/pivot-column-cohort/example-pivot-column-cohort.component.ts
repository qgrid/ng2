import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'pivot-column-cohort',
	'Different implementations of pivot columns'
];

@Component({
	selector: 'example-pivot-column-cohort',
	templateUrl: 'example-pivot-column-cohort.component.html',
	styleUrls: ['example-pivot-column-cohort.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePivotColumnCohortComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
