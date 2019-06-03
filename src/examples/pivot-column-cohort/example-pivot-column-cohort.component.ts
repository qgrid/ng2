import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pivot-column-cohort',
	templateUrl: 'example-pivot-column-cohort.component.html',
	styleUrls: ['example-pivot-column-cohort.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePivotColumnCohortComponent {
	static id = 'pivot-column-cohort';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
