import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'pagination-basic',
	'Data is divided into pages, pages can be changed using navigation buttons in the bottom part of the table'
];

@Component({
	selector: 'example-pagination-basic',
	templateUrl: 'example-pagination-basic.component.html',
	styleUrls: ['example-pagination-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePaginationBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
