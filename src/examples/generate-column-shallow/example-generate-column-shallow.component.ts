import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'generate-column-shallow',
	'Column generation based on data source'
];

@Component({
	selector: 'example-generate-column-shallow',
	templateUrl: 'example-generate-column-shallow.component.html',
	styleUrls: ['example-generate-column-shallow.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGenerateColumnShallowComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
