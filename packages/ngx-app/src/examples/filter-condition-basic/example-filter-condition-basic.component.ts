import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'filter-condition-basic',
	'Table data can be filtered using query builder (query builder button)'
];

@Component({
	selector: 'example-filter-condition-basic',
	templateUrl: 'example-filter-condition-basic.component.html',
	styleUrls: ['example-filter-condition-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFilterConditionBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
