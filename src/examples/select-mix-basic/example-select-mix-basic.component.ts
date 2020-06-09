import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'select-mix-basic',
	'Cells can be selected and deselected by clicking on them'
];

@Component({
	selector: 'example-select-mix-basic',
	templateUrl: 'example-select-mix-basic.component.html',
	styleUrls: ['example-select-mix-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectMixBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
