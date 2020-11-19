import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'sort-row-explicit',
	'Rows are sorted explicit by press Shift key'
];

@Component({
	selector: 'example-sort-row-explicit',
	templateUrl: 'example-sort-row-explicit.component.html',
	styleUrls: ['example-sort-row-explicit.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSortRowExplicitComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
