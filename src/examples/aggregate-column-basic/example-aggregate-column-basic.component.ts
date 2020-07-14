import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'aggregate-column-basic',
	'Aggregates are counted and shown under the columns'
];

@Component({
	selector: 'example-aggregate-column-basic',
	templateUrl: 'example-aggregate-column-basic.component.html',
	styleUrls: ['example-aggregate-column-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAggregateColumnBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
