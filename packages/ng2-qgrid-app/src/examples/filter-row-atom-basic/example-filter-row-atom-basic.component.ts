import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'filter-row-atom-basic',
	'Table data can be filtered by every column'
];

@Component({
	selector: 'example-filter-row-atom-basic',
	templateUrl: 'example-filter-row-atom-basic.component.html',
	styleUrls: ['example-filter-row-atom-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFilterRowAtomBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
