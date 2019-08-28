import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-filter-row-basic',
	templateUrl: 'example-filter-row-basic.component.html',
	styleUrls: ['example-filter-row-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFilterRowBasicComponent {
	static id = 'filter-row-basic';

	rows: Observable<any[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
