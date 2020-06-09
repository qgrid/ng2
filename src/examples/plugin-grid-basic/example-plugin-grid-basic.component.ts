import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'plugin-grid-basic',
	'Pages can be changed using bottom custom buttons'
];

@Component({
	selector: 'example-plugin-grid-basic',
	templateUrl: 'example-plugin-grid-basic.component.html',
	styleUrls: ['example-plugin-grid-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePluginGridBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
