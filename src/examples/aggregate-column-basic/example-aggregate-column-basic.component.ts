import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-aggregate-column-basic',
	templateUrl: 'example-aggregate-column-basic.component.html',
	styleUrls: ['example-aggregate-column-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAggregateColumnBasicComponent {
	static id = 'aggregate-column-basic';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
