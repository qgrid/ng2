import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'pane-basic',
	'Pane for each row can be opened by clicking on the corresponding row'
];

@Component({
	selector: 'example-pane-basic',
	templateUrl: 'example-pane-basic.component.html',
	styleUrls: ['example-pane-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePaneBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}
}
