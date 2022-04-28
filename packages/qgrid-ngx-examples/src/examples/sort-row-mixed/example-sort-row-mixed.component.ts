import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = ['sort-row-mixed', 'Rows are multiple sorted by press Shift key'];

@Component({
	selector: 'example-sort-row-mixed',
	templateUrl: 'example-sort-row-mixed.component.html',
	styleUrls: ['example-sort-row-mixed.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSortRowMixedComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
