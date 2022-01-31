import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'group-row-flat',
	'Different group types'
];

@Component({
	selector: 'example-group-row-flat',
	templateUrl: 'example-group-row-flat.component.html',
	styleUrls: ['example-group-row-flat.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGroupRowFlatComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
