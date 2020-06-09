import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'persistence-basic',
	'Settings can be saved in save/load menu (history button in the top toolbar)'
];

@Component({
	selector: 'example-persistence-basic',
	templateUrl: 'example-persistence-basic.component.html',
	styleUrls: ['example-persistence-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePersistenceBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
