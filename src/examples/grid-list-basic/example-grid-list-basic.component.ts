import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'example-grid-list-basic',
	templateUrl: 'example-grid-list-basic.component.html',
	styleUrls: ['example-grid-list-basic.component.scss'],
	providers: [DataService]
})
export class ExampleGridListBasicComponent {
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
		},
		]);
	}
}
