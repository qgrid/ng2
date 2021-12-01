import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'focus-cell-auto',
	'Focus is transmitted to the grid on startup'
];

@Component({
	selector: 'example-focus-cell-auto',
	templateUrl: 'example-focus-cell-auto.component.html',
	styleUrls: ['example-focus-cell-auto.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFocusCellAutoComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
