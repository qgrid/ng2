import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'manipulate-data-basic',
	'Rows with edited cells are highlighted'
];

@Component({
	selector: 'example-manipulate-data-basic',
	templateUrl: 'example-manipulate-data-basic.component.html',
	styleUrls: ['example-manipulate-data-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleManipulateDataBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
