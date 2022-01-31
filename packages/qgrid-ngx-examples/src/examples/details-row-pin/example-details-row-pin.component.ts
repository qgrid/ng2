import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'details-row-pin',
	'Details section of every row is pinned in the middle of the row'
];

@Component({
	selector: 'example-details-row-pin',
	templateUrl: 'example-details-row-pin.component.html',
	styleUrls: ['example-details-row-pin.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ExampleDetailsRowPinComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
