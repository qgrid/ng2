import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-filter-row-atom-basic',
	templateUrl: 'example-filter-row-atom-basic.component.html',
	styleUrls: ['example-filter-row-atom-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFilterRowAtomBasicComponent {
	static id = 'filter-row-atom-basic';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
