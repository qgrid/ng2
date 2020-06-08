import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'summary-column-aggregation',
	'Some columns have summary under the column'
];

@Component({
	selector: 'example-summary-column-aggregation',
	templateUrl: 'example-summary-column-aggregation.component.html',
	styleUrls: ['example-summary-column-aggregation.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSummaryColumnAggregationComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
