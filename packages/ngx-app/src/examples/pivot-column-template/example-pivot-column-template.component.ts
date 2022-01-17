import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'pivot-column-template',
	'Different implementations of pivot columns'
];

@Component({
	selector: 'example-pivot-column-template',
	templateUrl: 'example-pivot-column-template.component.html',
	styleUrls: ['example-pivot-column-template.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePivotColumnTemplateComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
