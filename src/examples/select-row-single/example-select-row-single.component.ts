import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'select-row-single',
	'Rows can be selected using checkboxes. Only one row can be selected in the same time'
];

@Component({
	selector: 'example-select-row-single',
	templateUrl: 'example-select-row-single.component.html',
	styleUrls: ['example-select-row-single.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowSingleComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
