import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';

const EXAMPLE_TAGS = [
	'grid-list-basic',
	'Grid list based on *ngFor directive'
];

@Component({
	selector: 'example-grid-list-basic',
	templateUrl: 'example-grid-list-basic.component.html',
	styleUrls: ['example-grid-list-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGridListBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	models: Observable<any[]>;

	constructor(dataService: DataService) {
		this.models = of([{
			columns: [{
				key: 'number',
				title: 'Number'
			}, {
				key: 'name',
				title: 'Name'
			}
			],
			rows: dataService.getAtoms()
		}
		]);
	}
}
