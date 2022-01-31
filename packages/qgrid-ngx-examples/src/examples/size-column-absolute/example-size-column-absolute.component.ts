import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'size-column-absolute',
	'Columns have absolute width'
];

@Component({
	selector: 'example-size-column-absolute',
	templateUrl: 'example-size-column-absolute.component.html',
	styleUrls: ['example-size-column-absolute.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSizeColumnAbsoluteComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
