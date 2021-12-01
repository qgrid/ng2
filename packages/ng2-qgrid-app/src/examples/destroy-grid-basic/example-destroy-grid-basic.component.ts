import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'destroy-grid-basic',
	'Table content can be destroyed/restored using UI button'
];

@Component({
	selector: 'example-destroy-grid-basic',
	templateUrl: 'example-destroy-grid-basic.component.html',
	styleUrls: ['example-destroy-grid-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDestroyGridBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;
	isVisible = true;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
