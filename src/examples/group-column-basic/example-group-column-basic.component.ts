import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'group-column-basic',
	'Columns are grouped'
];

@Component({
	selector: 'example-group-column-basic',
	templateUrl: 'example-group-column-basic.component.html',
	styleUrls: ['example-group-column-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGroupColumnBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
